---
title: "SKADA | DRAM 내부 회로의 파형 예측 (4)"
description: "일반적인 회귀 모델은 데이터가 서로 독립적이라 가정  시계열 데이터는 데이터 간의 시간적 상관 관계를 가짐      시계열 모델은 데이터 간의 시간적 패턴을 모델링 가능"
pubDate: 2024-07-08
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## 시계열 모델을 통한 파형 예측

### 시계열 데이터

- 일반적인 회귀 모델은 데이터가 서로 독립적이라 가정
- 시계열 데이터는 데이터 간의 시간적 상관 관계를 가짐
    - 시계열 모델은 데이터 간의 시간적 패턴을 모델링 가능
    
    ![Untitled](/images/extracurriculars-skada-dram-4/0045.png)
    

### Recurrent neural network (RNN)

- RNN은 시계열 데이터에 적용할 수 있는 대표적인 신경망 모델
- t + 1 시간 동안의 입력 $X_0, ..., X_t$를 RNN의 신경망 A에 입력할 때, A는 다음의 식에 따라 $h_0, ..., h_t$를 출력한다
    - $h_i = A(h_{i-1}, X_i)$
- 즉, $h_i$는 i시간 동안의 입력값의 패턴 정보를 가지게 되고, 최종 출력 $h_t$는 연속된 데이터의 시간적 패턴을 모델링할 수 있다.
    
    ![Untitled](/images/extracurriculars-skada-dram-4/0046.png)
    

### RNN 모델의 구현

- RNN에 데이터를 적용하기 위해 읽어온 데이터를 시계열 데이터 형식으로 변환해 주어야 함.
- Pandas로 읽어온 데이터의 shape은 다음과 같음.(one to one)
    - X_train: [#data, input dimension]
    - Y_train: [#data, output dimension]
- Many to one 문제의 RNN 모델 학습에 사용되는 데이터는 다음과 같은 shape이어야 함.
    - X_train: [#data, window size, input dimension]
    - Y_train: [#data, output dimension]
- Window size는 하나의 data sequence를 구성하는 시간별 데이터의 개수이다.
- $h_t$를 통해서 Y를 만들고자 하는게 프로젝트 목표
    
    ![Untitled](/images/extracurriculars-skada-dram-4/0047.png)
    
- 따라서, 읽어온 데이터를 적절히 전처리해주어야 함.
    - Window size를 조절하여 sequence의 길이를 조절함.
    - Interval을 조절하여 window 내 데이터 사이 시간 간격을 조절함. (공식 명칭 X)
    - Stride를 조절하여 window 간의 시간 간격을 조절함. (공식 명칭 X)
    
    ![Untitled](/images/extracurriculars-skada-dram-4/0048.png)
    
- 코드 예제
    
    ```python
    # 읽어온 데이터를 시계열 데이터로 변환
    def process_data(X, y, window_size, stride, interval):
    	X_ = []
    	for i in range(0, window_size * interval, interval):
    		X_.append(X[i:len(X) - window_size * interval + 1 + i])
    	X_ = np.asarray(X_)[:, ::stride].transpose().reshape(-1, window_size, 1)
    	return X_, y[num_sequences * interval-1::stride]
    ```
    
- Pytorch를 이용하여 RNN을 구현할 수 있다.
    - 모델 정의
        
        ```python
        import torch
        
        Class RNN(torch.nn.Module): # 모델 정의
        	def __init__(self, ...):
        		super(RNN, self) .__init__()
        		self.rnn = torch.nn.RNN(...) # RNN 레이어 추가
        		self.fc = torch.nn.Linear(...) # 출력 MLP 레이어 추가
        	
        	def forward(self, X): # 모델 forward pass
        		y, hidden_states = self.rnn(X) # hidden state는 0~vector로 초기화
        		y = self.fc(y[:, -1])
        		return y
        ```
        
    - 모델 학습
        
        ```python
        import torch
        
        criterion = torch.nn.MSELoss() # loss function 정의
        optimizer = torch.optim.Adam(model.parameters(), lr=0.01) #oprimizer 정의
        
        for epoch in range(epochs):
        	model.train() # modeldml gradient 계산하도록 설정
        	for it, data in enumerate(dataLoader):
        		X, y = data
        		pred = model(X)
        		loss = criterion(pred, y)
        		optimizer.zero_grad()
        		loss.backward()
        		optimizer.step()
        ```
        
    - 모델 예측
        
        ```python
        import torch
        
        model.eval() # model의 gradient 계산하지 않도록 설정
        pred = model(X_test)
        ```
        

### RNN 모델의 한계

- Sequence가 길어지면, 예전 데이터를 잘 기억하지 못한다.
    - Short-term memory problem
    - Gradient vanishing problem

### Long short-term memory (LSTM)

- 대표적인 RNN 기반 신경망 모델
- RNN의 short-term memory를 완화
- 중요한 부분만 기억하고, 중요하지 않은 부분은 삭제

### LSTM의 구조

- 3개의 변수
    - Cell state ($C_i$): i 시간까지 기억하고 있는 기억 메모리
    - Hidden state ($h_i$): i 시간에서의 모델 출력 값
    - Input ($X_i$): i 시간에서의 입력 값
- 3개의 Gate
    - Forget gate / Input gate / Output gate

![Untitled](/images/extracurriculars-skada-dram-4/0049.png)

- Forget gate
    - $F_{t-1} = C_{t-1} \times sigmoid(f_1(X_t, h_{t-1})), f_1 :$  MLP, $\times$ : element-wise multiplication
    - $sigmoid(f_1(X_t, h_{t-1}))$ : 0은 이전 기억 지워라, 1은 이전 기억을 유지해라
- Input gate
    - $I_t = sigmoid(f_2(X_t, h_{t-1})) \times tanh(f_3(X_t, h_{t-1})), f_2,f_3 :$  MLP
    - $sigmoid(f_2(X_t, h_{t-1}))$ : 0은 새로운 데이터를 지워라, 1은 새로운 데이터를 반영해라
- Cell state update
    - $C_t = F_{t-1} + I_t$
    - $F_{t-1} + I_t$ : 이전 기억과 새로운 데이터의 조합
- Output gate
    - $h_t = sigmoid(f_4(X_t, h_{t-1}))\times tanh(C_t), f_4 :$  MLP
    - $sigmoid(f_4(X_t, h_{t-1}))$ : t에서의 출력 값으로서 중요하면 1, 중요하지 않으면 0

### LSTM 모델의 구현

- Pytorch를 활용하여 쉽게 구현 가능
    
    ```python
    import torch
    
    Class LSTM(torch.nn.Module): # 모델 정의
    	def __init__(self, ...):
    		super(LSTM, self) .__init__()
    		self.lstm = torch.nn.LSTM(...) # LSTM 레이어 추가
    		self.fc = torch.nn.Linear(...) # 출력 MLP 레이어 추가
    		
    	def forward(self, X): # 모델 forward pass
    		y, (hidden_states, cell_states) = self.lstm)(X)
    		y = self.fc(y[:, -1])
    		return y
    ```
    

### Gated recurrent unit (GRU)

- LSTM과 더불어 대표적인 RNN 기반 신경망 모델
- LSTM과 동등한 성능을 보이지만, 모델의 weight 수가 더 적어 효율적.
- LSTM의 3개 gate를 2개로 줄임.
    - Reset gate / Update gate
        
        ![Untitled](/images/extracurriculars-skada-dram-4/0050.png)
        

### GRU의 구조

- Reset gate
    - 이전 기억에서 지워야 할 부분을 결정
    - $R_t = sigmoid(f_1(X_t, h_{t-1}))\times h_{t-1}$
    - $sigmoid(f_1(X_t, h_{t-1}))$ : 0은 이전 기억을 지워라, 1은 이전 기억을 유지하라
- Update gate
    - LSTM의 forget gate와 input gate의 역할과 유사
    - 이전 기억에서 지워야 할 부분이 새로운 데이터에서 가져와야 할 부분과 같다는 intuition
    - $z_t = sigmoid(f_2(X_t, h_{t-1}))$
    - $sigmoid(f_2(X_t, h_{t-1}))$
        - 0은 이전 기억을 유지하라 + 새로운 데이터를 반영하지 말아라
        - 1은 이전 기억을 지워라 + 새로우 ㄴ데이터를 반영하라
    - $h_t = (1-z_t)\times h_{t-1} + z_t\times tanh(f_3(R_t, X_t))$

### LSTM과 GRU의 성능 비교

- GRU가 LSTM보다 메모리에서 효율적이다.
    - GRU가 같은 학습 parameter 수로 hidden state의 차원을 더 크게 설정할 수 있다.
    - E.g.,) LSTM 36 차원 = GRU 46 차원
- 비슷한 parameter 수로 설정한 GRU와 LSTM의 성능은 학습 데이터에 따라 상이하다.
    - GRU가 좋을 경우도 있고, LSTM이 좋을 경우도 있다.
    
    ![Untitled](/images/extracurriculars-skada-dram-4/0051.png)
    

### GRU 모델의 구현

- Pytorch를 활용하여 쉽게 구현 가능
    
    ```python
    import torch
    
    Class GRU(torch.nn.Module): # 모델 정의
    	def __init__(self, ...):
    		super(GRU, self) .__init__()
    		self.gru = torch.nn.GRU(...) # GRU 레이어 추가
    		slef.fc = torch.nn.Linear(...) # 출력 MLP 레이어 추가
    	
    	def forward(self, X): # 모델 forward pass
    		y, hidden_states = self.gru(X)
    		y = self.fc(y[:, -1])
    		return y
    ```
