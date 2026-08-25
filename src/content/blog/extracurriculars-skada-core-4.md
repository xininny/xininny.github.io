---
title: "SKADA | 통신 Core 장비에 대한 이상 징후 감지 (4)"
description: "ARIMA모형은 과거의 관측 값과 오차를 사용하여 현재의 시계열 값을 설명 하는 모델  ARIMA(p, d, q) 모형은 d차 차분한 데이터 위 AR(p) 모형과 MA(q)모형을 합친 ARMA 모델을 일반화 한 모델  ARIMA : AR(Auto Regressive M"
pubDate: 2024-07-15
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## ARIMA 모델을 활용한 이상 징후 감지

### 자기 회귀 누적 이동평균 모형(ARIMA)

- ARIMA모형은 과거의 관측 값과 오차를 사용하여 현재의 시계열 값을 설명 하는 모델
- ARIMA(p, d, q) 모형은 d차 차분한 데이터 위 AR(p) 모형과 MA(q)모형을 합친 ARMA 모델을 일반화 한 모델
- ARIMA : AR(Auto Regressive Model) + MA (Moving Average Model) + Diff (Difference)
    
    
    | **종류** | **설명** |
    | --- | --- |
    | AR
    Auto Regressive | 과거 데이터에 기반하여 미래를 예측하는 모형으로 추세선을 통한 예측 과정은 선형 회귀모델과 동일 |
    | MA
    Moving Average | 직전 데이터와 현재 데이터의 평균인 이동평균을 이용한 시계열 분석 방법
    전체 자료 가운데 다른 하위 데이터에 대한 이동평균을 따로 생성해 활용도 가능 |
- 장점
    - 안정적 시계열(Stationary Series)과 비 안정적인 시계열(Non-Stationary Series)의 적용 가능
    - 통계 모델이므로 추론 과정이 투명하여 명확하게 이해 가능
    - 작은 데이터셋에 적용하여도 좋은 결과를 얻을 수 있음
    - 기계학습 모델과 다르게 과 적합 위험성 없이 좋은 성능을 얻을 수 있음
- 단점
    - 비선형 관계가 많은 데이터를 설명하는 데 적합하지 않음
    - 데이터셋이 커지더라도, 성능 향상을 보장하지 않음
    - 대규모 데이터셋에는 기계학습 모델 및 딥러닝 방법 보다 좋지 않음
- ACF와 PACF 방법을 통하여 모델 파라미터(p, d, q) 설정
    - PACF : 시차에 따른 일련의 편자기상관이며, 시차가 다른 두 시계열 데이터 간의 상호 연관성
    - 즉, $y_t$와 $y_{t+1}$ 간의 순수한 상관관계
    - $PACF(k) = Corr(e_t, e{t-k})$
    $where, e_t=y_t-(\beta_1y_{t-1}+...+\beta_{k-1}y_{t-(k-1)})$
    $y_t$와 $y_{t+k}$ 사이의 편자기상관
    
    | Model | ACF | PACF |
    | --- | --- | --- |
    | AR(p) | 점차 감소하여 0에 접근 | 시차 p 이후에 0에 접근 |
    | MA(q) | 시차 q 이후에 0에 접근 | 점차 감소하여 0에 접근 |
    | ARMA(p,q) | 시차 q 이후에 0에 접근 | 시차 p 이후에 0에 접근 |
- ACF와 PACF 방법을 통하여 모델 파라미터(p, d, q) 설정 예
    - 1차 차분한 데이터에 대해 정상성을 만족한다고 가정한다면, d=1로 설정
    - ACF : 전체적으로 양의 상관관계를 가지고 있으며, 시차가 2일 때 0에 접근 하므로 q=2로 설정
    - PACF : 시차가 1일 때 0에 근접하므로 p=1로 설정
        
        ![Untitled](/images/extracurriculars-skada-core-4/0075.png)
        

### ARIMA 모델을 통한 이상 징후 감지

- 시계열 데이터의 이상 징후
    - 정상일때와는 다른 데이터의 형태이나 관측 값이 비정상적으로 크거나 작을 경우
        
        ![Untitled](/images/extracurriculars-skada-core-4/0076.png)
        
- 이상 징후 감지 유형
    
    ![Untitled](/images/extracurriculars-skada-core-4/0077.png)
    
- Unsupervised learning을 이용한 이상 징후 감지
    - 주어진 MME 데이터는 학습 데이터에 정상, 비정상 데이터의 라벨링이 안되어 있음
        - 즉, 데이터에 대한 가정이 없을 경우에 해당하기 때문에 Unsupervised learning를 사용
    - 모델의 학습이 잘 된다면 정상/비정상 데이터의 모델링 후 분포가 잘 나타나질 수 있음
- ARIMA 모델에서 접근 방식
    - ARIMA 모델의 예측 값과 실제 값의 차이가 크게 날 때를 이상 징후라 판단
    - 잔차(실제 값-예측 값)이 특정 임계 값(Threshold) 보다 크다면 이상치
        
        ```python
        squared_errors = model_fit.resid ** 2
        
        threshold = np.mean(squared_errors) + np.std(squared_errors)
        data_indices = np.where(squared_errors >= threshold)
        ```
        
        ![Untitled](/images/extracurriculars-skada-core-4/0078.png)
        
- 이상 징후 감지 순서
    1. 정상성 검증
    2. ARIMA 모델 파라미터(p, d, q) 찾기
        
        I. 모든 p, d, q 조합으로 ARIMA를 학습 시키고 AIC 값을 리턴
        II. AIC 값이 제일 작은 (p, d, q)을 최적의 파라미터로 설정
        
        ![Untitled](/images/extracurriculars-skada-core-4/0079.png)
        
    3. 최적의 파라미터로 ARIMA 학습
    4. 특정 임계 값 이상인 값에 대해 이상치로 판단
