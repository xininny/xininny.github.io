---
title: "SKADA | DRAM 내부 회로의 파형 예측 (5)"
description: "Sequence 를 다른 sequence 로 바꾸어 주는 모델      E.g.,) 번역기 (한국어 → 영어)  Encoder와 Decoder로 구성      Encoder – 입력 데이터 (한국어) 를 context vector 로 압축      Decoder – c"
pubDate: 2024-07-09
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## Transformer 모델을 통한 파형 예측

### Sequence-to-Sequence (Seq2Seq)

- Sequence 를 다른 sequence 로 바꾸어 주는 모델
    - E.g.,) 번역기 (한국어 → 영어)
- Encoder와 Decoder로 구성
    - Encoder – 입력 데이터 (한국어) 를 context vector 로 압축
    - Decoder – context vector 에서 출력 데이터 (영어) 를 유추
- 문제점
    - Context vector 의 크기는 고정
    - Sequence가 길어지면 정보 손실이 발생
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0052.png)
    

### Attention

- 특정 출력값을 만들어내기 위해 입력값 중 관련 있는 부분을 더 집중
    - E.g.,) 나는 학교에 간다 → I go to school
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0053.png)
    
- RNN 기반 Attention mechanism의 문제점
    - 병렬 처리 불가능
- Attention Is All You Need, NIPS 2017
    - Self-attention mechanism

### Transformer

- 일반적인 Seq2Seq 모델과 마찬가지로 Encoder-Decoder 구조
- RNN 기반 Seq2Seq 모델과 다르게 데이터를 병렬적으로 처리 가능
    - Positional encoding 이용
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0054.png)
    

### Positional Encoding

- 입력 데이터의 순서 (pos) 를 데이터에 반영하여 모델에 입력
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0055.png)
    
- 짝수 번째 차원 (2ㅑ)은 sin을,	홀수 번째 차원 (2i + 1)은 cos을 적용
    - $PE(pos, 2i) = sin({pos \over 10000^d {2i\over model}})$
    - $d_{model}$은 데이터의 차원 수

### Positional Encoding 의 직관적 이해

- 입력 순서의 low frequency ~ high frequency 까지 정보를 모두 모델링
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0056.png)
    

### Attention의 종류

- Self-Attention
    - 입력값끼리, 또는 출력값끼리 attention 수행
        - Encoder self-attention
        - Masked decoder self-attention
            
            ![Untitled](/images/extracurriculars-skada-dram-5/0057.png)
            
- Cross-Attention
    - 입력값과 출력값 간에 attention 수행
        - Encoder-Decoder attention
            
            ![Untitled](/images/extracurriculars-skada-dram-5/0058.png)
            

![Untitled](/images/extracurriculars-skada-dram-5/0059.png)

### Multi-Head Attention

- Ensemble의 개념과 유사
- Value, Key, Query 를 N 개의 각각 다른 matrix로 곱하여 서로 다른 N 개의 Value, Key, Query 생성 후 개별적으로 Attention 수행
- 마지막에 N 개의 state 를 concatenate 한 후 matrix 연산을 이용하여 linear transform 한 후 최종 context vector 계산

![Untitled](/images/extracurriculars-skada-dram-5/0060.png)

### Add & Norm

- Multi-Head attention 을 통해 계산한 context vector 와 입력값을 단순히 더한 후 normalization 수행
- ResNet 의 residual connection 의 개념과 유사
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0061.png)
    

### Feed Forward

- 두 개의 layer 로 구성된 Multi layer perceptron network
    
    ![Untitled](/images/extracurriculars-skada-dram-5/0062.png)
    

### Transformer 모델의 구현

- Positional encoding
    
    ```python
    class PositionalEncoding(torch.nn.Module):
    	def __init__(self, num_dimension = 10, num_sequences = 150):
    		super(PositionalEncoding, self) .__init__()
    		
    		pe = torch.zeros(num_sequences, num_dimension)
    		position = torch.arange(0, num_sequences).unsqueeze(1)
    		div_term = torch.exp(torch.arange(0, num_dimension, 2) * \
    							 -(torch.log(torch.Tensor([10000.0])) / num_dimension))
    		pe[:, 0::2] = torch.sin(position * div_term)
    		pe[:, 1::2] = torch.cos(position * div_term)
    		self.pe = pe.unsqueeze(0)
    		
    	def forward(self, x):
    		x = x + self.pe
    		return x
    ```
    
- Transformer
    
    ```python
    class Transformer(torch.nn.Module):
    	def __init__(self, input_size, hidden_size, 
    				output_size, num_sequences,
    				num_heads, num_layers):
    		super(Transformer, self) .__init__()
    		self.embedding = torch.nn.Linear(input_size, embedding_size)
    		self.positional_encoder = PositionalEncoding(
    			num_dimension = input_size, num_sequences = num_sequences
    		)
    		self.transformer = torch.nn.Transformer(d_model = input_size,
    			nhead = num_heads, num_encoder_layers = num_layers,
    			num_decoder_layers = num_layers,
    			dim_feedforward = hidden_size,batch_first = True)
    		
    		self.fc = torch.nn.Linear(input_size, output_size)
    ```
    
    ```python
    class Transformer(torch.nn.Module):
    	def forward(self, X):
    		X = self.embedding(X)
    		tgt_input = torch.zeros_like(X[:, :1, :], dtype = X.dtype).to(X, device)
    		X = self.positional_encoder(X)
    		y = self.transformer(X, tgt_input)
    		y = self.fc(y[:, -1])
    		return y
    ```
