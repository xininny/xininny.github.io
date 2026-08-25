---
title: "SKADA | DRAM 내부 회로의 파형 예측 (2)"
description: "시계열 데이터는 연속된 시간 동안 순차적으로 측정한 데이터를 의미한다.  일반적인 데이터는 서로 독립적인데 반해, 시계열 데이터는 데이터 간에 시간적으로 상관관계가 있다.  즉, 시계열 데이터를 분석하려면 과거의 데이터들이 미래에 미치는 영향의 패턴을 알아내는 것이 중"
pubDate: 2024-07-04
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## 데이터 이해 및 전처리

### 시계열 데이터

- 시계열 데이터는 연속된 시간 동안 순차적으로 측정한 데이터를 의미한다.
- 일반적인 데이터는 서로 독립적인데 반해, 시계열 데이터는 데이터 간에 시간적으로 상관관계가 있다.
- 즉, 시계열 데이터를 분석하려면 과거의 데이터들이 미래에 미치는 영향의 패턴을 알아내는 것이 중요하다.
- 시계열 데이터 예시 : 일년 동안의 기온, 주가, 자연어, 비디오 등
- 시계열 데이터의 이용
    
    ![Untitled](/images/extracurriculars-skada-dram-2/0032.png)
    
    - Many to many : 입력과 출력 모두 시계열
    - One to many : 입력은 시계열 X, 출력은 시계열
        - 이미지 캡셔닝 : 이미지가 입력되면 출력으로 이미지를 설명하는 문장 출력
    - Many to one : 입력은 시계열, 출력은 시계열 X

### 전압 파형 데이터

- 회로에 인가한 입력 전압과 그에 따른 5가지 출력 전압 값을 picosecond 단위로 기록
    - 훈련 데이터 : 약 45만개
    - 테스트 데이터 : 약 19만개
- txt 파일 형태로 저장
    - , 로 구분(이렇게 구분되어 있는 데이터는 csv(comma-separated values)
    - 시간, 입력 전압, 출력 전압 A ~ E ⇒ Time, Input_V, A, B, C, D, E
- 학습용 데이터 중 일부는 학습에, 일부는 검증에 사용
- 실무에서 테스트용 데이터는 일반적으로 label이 없음
- 딥러닝 모델을 개발할 때, 모델을 여러 개 만들어서 어떻게 동작하는지 보게 되는데 동작의 검증을 validation 데이터로 하게 됨
- 학습용 데이터로 학습하고 성능 확인은 validation으로 하고, 가장 성능이 좋은 걸 사용

### 읽기

- Pandas의 read_csv 함수 활용
    
    ```python
    import pandas as pd # pandas 라이브러리 불러오기
    
    train_data_path = './dataset/~.txt' # 학습 data 위치를 변수로 저장
    test_data_path = './dataset/~.txt' # 테스트 data 위치를 변수로 저장
    
    df_train = pd.read_csv(train_data_path, delimiter = ',', header = 0) # 학습 data 읽기
    df_test = pd.read_csv(test_data_path, delimiter = ',', header = 0) # 테스트 data 읽기
    ```
    
    - 하드 드라이브에 있는 것을 메모리로 데이터를 불러오기
    - read_csv : 데이터 불러오기
    - df : 일반적으로 pandas에서 데이터를 불러올 때 dataframe이라고 함
    - 하드 드라이버에 있는 데이터부터 불러옴
    - delimiter은 각각의 데이터가 어떤 걸로 분리되어 있는지, 헤더는 몇 번째부터의 데이터를 활용할 것인지 알려주는 argument

- Pandas의 여러 함수 및 인덱싱을 사용해 데이터 내부 확인
    
    ```python
    df_test.shape # 테스트 data의 행과 열 개수 출력 ex. (19xxx, 7)
    df_test.head(5) # 테스트 data 중 첫 다섯 행만 출력
    df_test.tail(5) # 테스트 data 중 마지막 다섯 행만 출력
    ```
    
    ```python
    df_test.describe() # 테스트 data의 통계값 출력(count, mean, std 등)
    df_test.columns # 테스트 data의 header (열 이름) 출력
    df_test.values # dataframe을 numpy ndarray로 변환
    # df_test.to_numpy()
    # ndarray n dimensional array(행렬은 2 dimensional array)
    ```
    
    ```python
    df_test.loc[0:4] # 테스트 data의 첫 4개 행을 반환
    df_test.loc[0:4, ['Input_V', 'A']] # 첫 다섯 행을 반환하되, Input_V와 A열만 반환
    df_test.iloc[-4:, 0:2] # 마지막 네 개 행을 반환하되, 첫 두 개 열만 반환
    ```
    

### 결측 치 존재 여부 확인

- 데이터에 결측 치 (NaN)가 존재할 수 있음
- 결측 치란 관찰되지 않은 데이터로, 빈 칸을 의미함
    
    ```python
    is_null = df_train.isnull() # dataframe을 구성하는 각 element가 빈 칸이면 True
    Is_null_np = is_null.values # is_null을 numpy ndarray로 변환
    exists_null = is_null_np.any() # data에 빈칸이 하나라도 존재하면 True, 아니면 False
    ```
    

### 데이터 시각화

- 데이터 이해를 돕기 위해 읽어 온 데이터를 시각화 해보기
    
    ```python
    from matplotlib import pyplot as plt # matplotlib 라이브러리 불러오기
    %matplotlib inline # 출력된 그래프가 브라우저에서 보이도록 함
    
    fig = plt.figure(figsize = (10, 5)) # 가로 10, 세로 5 사이즈의 figure 생성
    plt.xlabel('Time (picosecond) ') # x 축 레이블 지정
    plt.ylabel('Values ') # y 축 레이블 지정
    picoseconds = df_train.iloc[10000:20000, 0] * 10e+12 # 1만 ~ 2만 행의 시간 값(첫번째 열)
    for i in range(1, len(df_train.columns)):
    	plt.plot(picoseconds, df_train.iloc[10000:20000, i], label = df_train.columns[i])
    	# 1만 ~ 2만 행의 입력 및 출력 전압 값(두번째 열 ~ 마지막 열)
    	
    plt.legend(loc = 'upper right') # 범례가 오른쪽 위에 위치하도록 함
    plt.show()
    ```
    

### 학습용 데이터와 검증용 데이터를 분리

- 학습용 데이터 중 앞 90%는 학습에, 나머지 10%는 검증에 사용한다.
- 딥러닝 모델 학습 시, 모델의 에폭 별 성능을 평가하기 위해 학습용 데이터를 이용하는 것은 적절치 않다.
    - 에폭 : 전체 학습 데이터셋을 모델이 한 번 학습하는 것
    - 여러번의 에폭을 통해 학습하고 매 에폭마다 성능을 평가한다.
    - 학습 데이터는 크기 때문에 성능 검증만으로 시간이 많이 걸린다.
    - 검증용 데이터를 만들어서 한 에폭이 끝나면 검증용 데이터에서 성능을 평가한다.
    - 모델이 학습용 데이터에 과적합 되어있을 수 있기 때문이다.
- 그래서, 모델 학습에 사용되지 않은 검증용 데이터를 모델 평가에 사용한다.
    - training data loss는 줄이게 되고, 테스트 데이터 셋의 loss는 감소하다가 증가한다.
        - 학습 초반에 테스트 셋에서도 train에서 성능이 안 좋아서 안 쓴다.
        - 학습이 많이 진행된 것은 과적합, training에서는 좋은 성능을 보이지만 테스트에서는 일반화가 잘 되지 않는 모델이 되기에 쓰지 않는다.
    
    ```python
    train_valid_ratio = 0.9 # 학습용 데이터와 검증용 데이터의 비율을 9:1로 설정합니다.
    train_len = int(df_train.shape[0] * train_valid_ratio) # 학습 데이터의 개수
    valid_len = df_train.shape[0] - train_len # 검증용 데이터의 개수
    Test_len = df_test.shape[0] # 테스트용 데이터의 개수
    ```
    

- 각 dataframe을 numpy ndarray로 변환하여 학습 데이터, 검증 데이터, 테스트 데이터를 dictionary로 저장
    
    ```python
    train_data = {
    	'time' : df_train.iloc[:, 0].values[:train_len],
    	'X' : df_train.iloc[:, 1].values[:train_len],
    	'y' : df_train.iloc[:, 2].values[:train_len]
    }
    valid_data = {
    	'time' : df_train.iloc[:, 0].values[train_len:],
    	'X' : df_train.iloc[:, 1].values[train_len:],
    	'y' : df_train.iloc[:, 2].values[train_len:]
    }
    test_data = {
    	'time' : df_test.iloc[:, 0].values,
    	'X' : df_test.iloc[:, 1].values,
    	'y' : df_test.iloc[:, 2].values
    }
    ```
    

### 데이터 정규화

- 데이터 정규화는 데이터의 범위를 적당하게 (ex. -1 ~ 1 사이) 맞춰 주는 것을 의미한다.
- 일반적으로, 머신러닝 모델은 정규화 된 데이터에서 더 잘 학습되는 것으로 알려져 있다.
- 이 프로젝트에서, 데이터의 각 변수를 표준화 (평균을 뺀 후 표준편차로 나누어 줌) 하여 정규분포를 따르도록 하는 정규화를 수행한다.
    
    ![Untitled](/images/extracurriculars-skada-dram-2/0033.png)
    
- 평균이 0, 표준 편차가 1이 되도록 정규화시킨다.
    
    ```python
    X_mean = train_data['X'].mean() # 학습 데이터의 입력 전압 평균
    X_std = train_data['X'].std() # 학습 데이터의 입력 전압 표준편차
    
    X_train = (train_data['X'] - X_mean) / X_std # 학습 데이터 정규화
    X_valid = (valid_data['X'] - X_mean) / X_std # 검증 데이터 정규화
    X_test = (test_data['X'] - X_mean) / X_std # 테스트 데이터 정규화
    ```
