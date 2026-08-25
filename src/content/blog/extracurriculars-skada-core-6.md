---
title: "SKADA | 통신 Core 장비에 대한 이상 징후 감지 (6)"
description: "RNN (순환신경망)      반복적이고 순차적인 데이터 학습에 특화된 인공신경망의 한 종류      순환구조를 이용하여 과거의 학습을 가중치를 통해 현재 학습에 반영"
pubDate: 2024-07-17
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## LSTM 모델을 활용한 이상 징후 감지

### RNN 기반 딥러닝 모델

- RNN (순환신경망)
    - 반복적이고 순차적인 데이터 학습에 특화된 인공신경망의 한 종류
    - 순환구조를 이용하여 과거의 학습을 가중치를 통해 현재 학습에 반영
        
        ![Untitled](/images/extracurriculars-skada-core-6/0083.png)
        
- RNN(순환신경망) 과 CNN(합성곱신경망)
    
    
    | **구분** | **CNN** | **RNN** |
    | --- | --- | --- |
    | **설명** | 합성곱 계층을 통해 추출된 특징들을 기반으로 분류하는 딥러닝 분석모델 | 데이터 순서정보를 반영하는 재귀구조의 딥러닝 분석모델 |
    | **장점** | 지엽적정보를 추출하는데 탁월함 | 시계열 정보 반영 가능
    입-출력 개수에 따른 다양한 모델 구성가능 |
    | **단점** | 전역적 정보를 파악하기 힘듦 | 입력데이터 전처리필수(ex 임베딩)
    네트워크 가중치 소실 문제 |
    | **주요 분야** | 이미지 분류, 영상 인식 | 텍스트분류 및 번역, 시계열 예측 |
- RNN 구조
    - 시퀀스 길이에 관계없이 인풋과 아웃풋을 받아들일 수 있는 네트워크 구조
    - 테스크에 맞게끔 다양하고 유연하게 구조를 만들 수 있음
        
        ![Untitled](/images/extracurriculars-skada-core-6/0084.png)
        
- Many-to-many : 과거 X일의 가격을 사용하여 미래 Y일의 가격을 예측
    - 5일 데이터로 다음 2일 가격 예측
    - 단일변수 : 예측 변수는 “value“ 하나
    - 타임스템프 : 5
        
        ![Untitled](/images/extracurriculars-skada-core-6/0085.png)
        
- Many-to-one : 과거 X일의 가격을 사용하여 미래 1일의 가격을 예측
    
    ![Untitled](/images/extracurriculars-skada-core-6/0086.png)
    
- LSTM 과 GRU
    - 기울기 소실 gradient vanishing 문제
        - RNN은 관련 정보와 그 정보를 사용하는 지점 사이 거리가 멀 경우 역전파시 미분 값이 점차 줄어 학습능력이 크게 저하 됨
            
            ![Untitled](/images/extracurriculars-skada-core-6/0087.png)
            
    - LSTM 구조 : 기울기 소실 gradient vanishing 문제를 해결하기 위해 RNN의 hidden-state에 cell-state를 추가
    - LSTM 구성 요소 4개 : input gates, forget gate, cell state, output gate
        
        ![Untitled](/images/extracurriculars-skada-core-6/0088.png)
        
    - LSTM 구조와 RNN 구조 모델 비교
        - 기본 RNN 구조
            
            ```python
            import torch.nn as nn
            
            class VanillaRNN(nn.Module):
            	def __init__(self, input_size, hidden_size, sequence_length):
            		super(VanillaRNN, self).__init()
            		self.hidden size = hidden size
            		self.rnn1 = nn.RNN(input_size, hidden_state, 1)
            		self.rnn2 = nn.RNN(input_size, hidden_size, 1)
            		self.fc = nn.Linear(hidden_size * sequence_length, 1)
            		
            	def forward(self, x):
            		out, _ = self.rnn1(x)
            		out, _ = self.rnn2(out)
            		out = out.reshape(out.shape[0], -1) # many to many 전략
            		return out
            ```
            
        - LSTM 구조
            
            ```python
            import torch.nn as nn
            
            class LSTM(nn.Module):
            	def __init__(self, input_size, hidden_size, sequence_length):
            		super(LSTM, self).__init__()
            		self.hidden_size = hidden_size
            		self.lstm1 = nn.LSTM(input_size, hidden_size, 1)
            		self.lstm2 = nn.LSTM(hidden_size, hidden_size, 1)
            		self.fc = nn.Linear(hidden_size * sequence_length, 1)
            	
            	def forward(self, x):
            		out, _ = self.lstm1(x)
            		out, _ = self.lstm2(out)
            		out = out.reshape(out.shape[0], -1) # many to many 전략
            		out = self.fc(out)
            		return out
            ```
            
    - GRU : LSTM과 같이 RNN의 기울기 소실 gradient vanishing 문제를 해결하기 위해 고안 됨
    - GRU 구성요소 :
        - LSTM보다 메모리 효율적인 구조(Reset gate 와 update gate)로 구성
        - RNN 의 input gate와 forget gate → Reset gate
        - RNN 의 out gate → update gate
            
            ![Untitled](/images/extracurriculars-skada-core-6/0089.png)
            
- 단일 변수로 학습
    - 하나의 변수로 이루어져 있는 데이터
    - 단일 변수의 변화량 만을 분석하는 가장 간단한 형태의 분석기법
- 다중 변수로 학습
    - 하나 이상의 변수로 이루어져 있는 데이터
    - 다 변량 분석법으로, 2개 이상의 변수 간의 관계를 분석
    - 예측할 변수의 과거 데이터 및 데이터 간의 의존성을 고려해야 함

### LSTM 모델을 통한 이상 징후 감지

- LSTM 모델에서 접근 방식
    - ARIMA 모델을 사용하여 이상 징후를 감지한 것과 동일하게 특정 임계 값을 벗어나면 이상치라 정의
    - 설정한 임계 값보다 모델의 테스트 loss가 클 경우 이상치로 정의
        
        ```python
        threshold_value = '설정한 값'
        anomalies = test_mae_loss > threshold_value
        ```
        
- 이상 징후 감지 순서
    1. 훈련과 테스트 데이터 설정
    2. 데이터 표준 정규화(Standard Scaler) 진행
        - 분석 시, 변수들의 스케일이 다른 경우 정상적인 학습 및 예측을 위해 진행
        - 데이터 표준화 : 데이터가 표준정규분포의 속성을 갖도록 피처를 재조정 하는 것
            - 표준 정규화는 평균 0, 분산 1로 조정
                
                ![Untitled](/images/extracurriculars-skada-core-6/0090.png)
                
    3. Multivariate LSTM을 이용하여 주어진 데이터 학습 및 이상치 탐지
        - 데이터의 입력 너비 조절(Time step 3으로 설정)
        - 주어진 데이터를 가지고 설정한 LSTM 모델 학습
        - 학습 및 예측을 통해 이상치 탐지 및 그리기
