---
title: "SKADA | DRAM 내부 회로의 파형 예측 (3)"
description: "입력 변수와 출력 변수 사이의 관계를 모델링하여, 입력값에 대한 출력값을 예측하는 일"
pubDate: 2024-07-05
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## 회귀 분석을 통한 파형 예측

### 회귀 분석 (regression analysis) 이란?

- 입력 변수와 출력 변수 사이의 관계를 모델링하여, 입력값에 대한 출력값을 예측하는 일
    
    ![Untitled](/images/extracurriculars-skada-dram-3/0034.png)
    
- X → y로 가는 함수를 F라고 하면 y=F(x)
- F의 형태에 따라서 모델들이 나뉘게 됨
- 모델링은 함수 F를 찾는다는 의미
- 회귀의 기본 원칙은 잔차 (residual error)를 최소화 하는 것
    
    ![Untitled](/images/extracurriculars-skada-dram-3/0035.png)
    
- 잔차를 무조건 최소화 하면 좋은가? → No
- 학습용 데이터로 훈련해 테스트용 데이터에 적용
    - 학습 데이터에 과도하게 적합 된 회귀 모델 (과적합)은 일반화가 어려움
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0036.png)
        

### 회귀 모델

- 설명 변수 X로부터 반응 변수 y를 예측하는 task
- $y' = f(X;β)$
    - f는 회귀 모델, 입력으로는 X, β는 변수라고 생각(회귀 모델을 정의해주는 변수)
- 목적 : 잔차 (y와 y’의 차이)를 최소화하는 β를 찾는 것
- 종류 : 선형 회귀 모델, 비선형 회귀 모델

### 선형 회귀 모델

- 모델의 변수 βi와 Y가 선형 관계
    - $Y = β_1X + β_0$
    $Y = β_2X^2 + β_1X + β_0$
    $Y = β_3X^3 +  β_2X^2 + β_1X + β_0$
    …
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0037.png)
        
        - 파란색 점들이 training set의 점
        - 학습을 시킴으로써 찾아낸 모델은 빨간색
        - 복잡해질 수록 training set에 가까워짐
    - 목적 : 잔차를 최소화하는 β를 찾는 것
    - 장점 : 빠르고 효율적이며, 최적화가 쉽다
    - 단점 : 복잡한 관계를 모델링하기 어렵다.
    - E.g) 최소 제곱 선형 회귀 모델, Ridge 회귀 모

### 최소 제곱 선형 회귀 모델(Linear least square regression)

- $X = \{X_1, …, X_N\}, y = \{y_1, …, y_N\}$, X는 입력 데이터, y는 출력 데이터, N은 데이터 개수
- $X_i = \{x_i1, …, x_id\}$ , d는 입력 데이터 차원 수, x_i1들은 스칼라 값
- $\hat{y_i} = f(X_i;β) = β_0 + β_1x_i1 + β_2x_i2 + ... + β_dx_id = β_0 + β^TX_i$
- $X = \begin{bmatrix}x_{11} & x_{12} & \cdots & x_{1d} \\
x_{21} & x_{22} & \cdots & x_{2d}\\
\vdots & \vdots & \vdots & \vdots\\
x_{N1} & x_{N2} & \cdots & x_{Nd}
\end{bmatrix}$ →  $X = \begin{bmatrix}1 & x_{11} & \cdots & x_{1d} \\
1 & x_{21} & \cdots & x_{2d}\\
\vdots & \vdots & \vdots & \vdots\\
1 & x_{N1} & \cdots & x_{Nd}
\end{bmatrix}$
- $\hat{y} = Xβ$
- $e = y - \hat{y} = y - Xβ$ 에서 $e^Te = \sum_{i}^N (y_i - \hat{y_i})^2 = (y-X\beta)^T(y-X\beta)$ 를 최소화하는 $\beta = \{\beta_0, ..., \beta_d\}$ 최적화
- $e^Te$ 를 잔차제곱합(RSS : residual sum of squares)라고 한다.
- $e^Te$ 를 최소화하는 $\beta = \{\beta_0, ..., \beta_d\}$ 최적화
→ $e^Te$를 β로 편미분하여 0이 되는 β를 찾자
- $e^Te = (y-X\beta)^T(y-X\beta) = y^Ty - 2X^ty\beta + \beta^TX^TX\beta$
- ${d(e^Te)\over d\beta} = -2X^Ty + 2X^TX\beta = 0$
- $X^TX\beta = X^Ty$
- 이 때, $X^TX$가 역행렬을 가진다면 최적의 β인 β*는
$\beta^* = (X^TX)^{-1}X^Ty$
    - $X^TX$의 역행렬이 존재한다는 전제 조건이 있어야 함
- Scikit-learn 패키지로 쉽게 구현 가능
    
    ```python
    from sklearn.linear_model import LinearRegression
    
    fitter = LinearRegression() # 최소 제곱 선형 회귀 모델 생성
    fitter.fit(X_train, y_train) # 모델 학습
    pred = fitter.predict(X_test) # 테스트 데이터에 대해 예측
    ```
    
- 단점 : 과적합이 일어날 수 있음

### Ridge 회귀 모델 (Ridge regression)

- Ridge 회귀 모델은 잔차제곱합 (RSS)을 최소화하는 대신, 아래의 식을 최소화하는 것을 목표로 한다.
$RSS + \lambda \sum \beta^2$ , λ는 작은 상수
- 즉, 목적 함수에 학습 계수의 제곱합을 더해 특정 계수가 너무 커지는 것을 방지해 과적합을 예방
- 위와 같이 학습 계수의 제곱합을 목적함수에 더하는 것을 Ridge regularization (Ridge 정규화)라고 한다.
- 학습 계수의 절대값의 합을 목적함수에 더하는 것은 Lasso regularization (Lasso 정규화)라고 한다.
$RSS + \lambda \sum |i|$
- Scikit-learn 패키지로 쉽게 구현 가능
    
    ```python
    from sklearn.linear_model import Ridge
    
    fitter = Ridge(alpha = 1.0) # Ridge 선형 회귀 모델 생성, alpha는 λ의 값
    fitter.fit(X_train, y_train) # 모델 학습
    pred = fitter.predict(X_test) # 테스트 데이터에 대해 예측
    ```
    

### 비선형 회귀 모델

- 모델의 변수 $\beta_i$와 Y가 비선형 관계
    - $Y = {\beta_0X + \beta_1\over\beta_2e^X + \beta_3}$
    …
- 복잡한 관계를 모델링하기 적합하다.
- 선형 회귀 모델보다 복잡하며, 최적화가 어려울 수 있다.
- E.g) Multi layer perceptron, convolutional neural network

### 다중 퍼셉트론 (Multi layer perceptron, MLP)

- MLP는 가장 단순한 형태의 신경망 모델
    
    ![Untitled](/images/extracurriculars-skada-dram-3/0038.png)
    
    - 레이어 사이의 계수들($w_{i,j,k}$)이 학습 계수
    - $w_{i,j,k}$에서 i, j는 시작과 끝 레이어의 뉴런의 index, k는 레이어의 index
    - k번째 레이어의 j번째 뉴런의 값은
    $f(\sum_i w_{i,j,k})$
    - f는 환성함수로, MLP 모델이 비선형적 모델링을 가능하게 한다.
    - Sigmoid : $f(x) = {1 \over 1+e^{-x}}$
    - ReLU : $f(x) = max(0,x)$
    - w의 값을 찾는 것이 목표
- MLP 모델의 학습 방법 : 경사하강법 (gradient descent)
- 손실함수를 각 학습 계수로 편미분하여, 손실값이 작아지는 방향으로 학습 계수를 점차적으로 이동시킴
- 역전파 (back propagation)를 이용하여 각 학습 계수의 편미분 값 계산
    
    ![Untitled](/images/extracurriculars-skada-dram-3/0039.png)
    
- 역전파 알고리즘
    
    
    | **순서** | **행동** |
    | --- | --- |
    | 0 | MLP 모델 초기화 |
    | 1 | 첫번째 데이터를 이용해 forward pass, 오차 계산, 오차 역전파 계산, 학습 계수 갱신 |
    | 2 | 두번째 데이터를 이용해 forward pass, 오차 계산, 오차 역전파 계산, 학습 계수 갱신 |
    | 3 | 세번째 데이터를 이용해 forward pass, 오차 계산, 오차 역전파 계산, 학습 계수 갱신 |
    | … |  |
    | N | 마지막 데이터를 이용해 forward pass, 오차 계산, 오차 역전파 계산, 학습 계수 갱신, 1 에폭 끝 |
    - 0  : w를 초기화
    - 학습 계수 갱신 : w를 업데이트
    - Forward pass
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0040.png)
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0041.png)
        
    - 에러 계산
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0042.png)
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0043.png)
        
    - 학습 계수 갱신
        
        ![Untitled](/images/extracurriculars-skada-dram-3/0044.png)
        
    - learning rate가 너무 커도 좋지 않다.
- Scikit-learn 패키지로 쉽게 구현 가능
    
    ```python
    from sklearn.neural_network import MLPRegressor
    
    fitter = MLPRegressor(hidden_layer_sizes = (32, 32)) # MLP 회귀 모델 생성
    fitter.fit(X_train, y_train) # 모델 학습
    pred = fitter.predict(X_test_ # 테스트 데이터에 대해 예측
    ```
