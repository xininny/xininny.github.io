---
title: "SKADA | 통신 Core 장비에 대한 이상 징후 감지 (5)"
description: "Prophet은 페이스북에서 공개한 시계열 예측 라이브러리 (논문:“Forecasting at Scale” 2017, Sean J et. al.)  가법 모형에 기반하여, 고전적인 통계적 기법을 발전 시킨 방법"
pubDate: 2024-07-16
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## Prophet 모델을 활용한 이상 징후 감지

### Prophet

- Prophet은 페이스북에서 공개한 시계열 예측 라이브러리 (논문:“Forecasting at Scale” [2017, Sean J et. al.])
- 가법 모형에 기반하여, 고전적인 통계적 기법을 발전 시킨 방법
    
    ![Untitled](/images/extracurriculars-skada-core-5/0080.png)
    
- 기존 시계열 모델을 보완 하기 위하여 탄생
- 기존 시계열 모델 사용 시 문제점
    1. 완전자동화 되는 시계열은 튜닝하기가 어렵다
    2. 기업 도메인 지식이 뛰어난 사람은 시계열에 대한 지식이 부족하다
- Prophet 장점
    - 트렌드와 주기적 특성 모델링 가능
    - 예외적이고 이벤트와 같은 휴가철 상황도 모델링 가능
    - 정확도가 높고 예측이 빠름
    - 직관적인 파라미터로 모델 수정이 용이
    
    ![Untitled](/images/extracurriculars-skada-core-5/0081.png)
    
- “Estimation procedures for structural time series models”[1990, Harvey & Peters] 의 소개된 기본 3요소를 따름
    - $g(t)$ : 주기적이지 않은 변화인 트렌드를 나타냄
    - $s(t)$ : 계절성를 나타내며 주별, 연도별 등 주기적으로 나타나는 패턴들을 포함
    - $h(t)$ : 휴일과 같이 불규칙한 이벤트들을 나타냄
    - $\epsilon_i$ :정규분포라고 가정한 오차
    - $y(t) = g(t) + s(t) + h(t) + \epsilon_i$
- ARIMA와 Prophet 비교
    
    
    |  | **ARIMA** | **Prophet** |
    | --- | --- | --- |
    | **파라미터** | 파라미터(p, d, q) 를 찾기 위해 
    데이터에 대한 충분한 이해가 전제 되어야 함 | 직관적으로 파라미터를 수정하기 용기 |
    | **유연성** | 주기적 특성 모델링 불가능 | 주기적 특성 모델링 가능 |
    | **정규화** | 차분과 정규화 필수 | 차분과 정규화 불필요 |
    | **결측 치** | 결측 치 처리 필요 | 결측 치 처리 불필요 |

### Prophet 모델을 통한 이상 징후 감지

- Prophet 모델에서 접근 방식
    - ARIMA 모델을 사용하여 이상 징후를 감지한 것과 동일하게 특정 임계 값을 벗어나면 이상치라 정의
        
        ![Untitled](/images/extracurriculars-skada-core-5/0082.png)
        
- 이상 징후 감지 순서
    1. Prophet 을 이용하여 주어진 훈련용 데이터 학습
        - Prophet 은 컬럼으로 ‘ds’, ‘y’ 값만 받을 수 있음
        - Prophet 모델을 설정(이때, 많은 옵션을 설정할 수 있음)
        - 주어진 데이터를 가지고 설정한 Prophet 모델 학습
    2. 학습된 모델을 사용하여 시계열 예측 시 존재 했던 이상치 탐지
        - Prophet은 예측 값 뿐만 아니라 'yhat_lower', 'yhat_upper', 'trend_lower', 'trend_upper’ 과 같은 다양한 아웃 풋을 제공
        - 즉, ARIMA 와 같이 직접 임계 값을 설정해서 임계값을 넘는 값에 대한 이상치를 지정 해 줄 필요 없음
    3. 이상치 그리기
