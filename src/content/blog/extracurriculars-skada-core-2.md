---
title: "SKADA | 통신 Core 장비에 대한 이상 징후 감지 (2)"
description: "Series : 1차원 데이터 구조, 모든 타입의 데이터를 할당 할 수 있음  DataFrame : 2차원 데이터 구조로써 관계형 데이터 베이스의 테이블 구조와 비슷, Series의 집합      Data : DataFrame에 저장할 데이터 (numpy ndarray"
pubDate: 2024-07-13
updatedDate: 2024-12-26
tags: ["AI", "DL", "ML", "SKADA"]
category: "🌐 Extracurriculars"
---
## 데이터 재구조화

### 판다스 구성요소

- Series : 1차원 데이터 구조, 모든 타입의 데이터를 할당 할 수 있음
- DataFrame : 2차원 데이터 구조로써 관계형 데이터 베이스의 테이블 구조와 비슷, Series의 집합
    - Data : DataFrame에 저장할 데이터 (numpy ndarray, dictionary 등 다양한 형태 가능)
    - Index : 행(row) 이름으로써 기본값 0 부터 1씩 증가하는 정수
    - columns : 열(column) 이름, 기본값 = 0부터 1씩 증가하는 정수
    - Missing value : 결측 값으로 NaN 으로 표기 됨
    - Axis : 행 방향(axis=0) 열 방향(axis=1)

### 판다스 기초 인덱싱

- DataFrame 조회
    
    ```python
    df.head() # 데이터 전부를 보여주지 않고 데이터의 상단 부분만 출력
    df.tail() # 데이터 전부를 보여주지 않고 데이터의 하단 부분만 출력
    df.shape() # 데이터의 행과 열의 개수 출력
    df.describe() # 데이터의 대략적인 통계적 정보 요약
    
    df.columns # 데이터 전체의 컬럼 확인
    df.index # 데이터 전체의 인덱스 확인
    df.values # 데이터 프레임 내부의 array 출력
    ```
    
- DataFrame 형태 변경
    
    ```python
    df.T # 데이터를 전치(column과 인덱스가 서로 바뀌게)
    df.sort_values(by="기준", ascending=False) # 기준값 별로 내림차순 정렬
    ```
    
- DataFrame 접근
    
    ```python
    df['컬럼이름'] # 원하는 컬럼 접근
    df.loc['인덱스이름'] # index 이름을 통해서 접근
    df.iloc['인덱스위치'] # index 위치를 통해서 접근
    ```
    
- DataFrame 삭제
    
    ```python
    df.drop(['해당행'], axis=0) # 해당 컬럼 행을 삭제
    df.drop(['해당열'], axis=1) # 해당 컬럼 열을 삭제
    ```
    
- DataFrame 계층색인
    - DataFrame은 2개 이상의 색인(인덱스)을 지정할 수 있다.
        
        ```python
        df.swaplevel(0,1,axis=0) # 인덱스레벨 0과 1을 바꿈
        
        # unstack(level) : 로우 인덱스를 컬럼 인덱스로 옮길 때 사용
        df.unstack(['연도']) # 연도 인덱스를 컬럼으로 이동
        
        df.swaplevel(0,1,axis=1) # 열 인덱스 0과 1을 바꿈
        ```
        
- DataFrame 결측 치 확인
    
    ```python
    df.isna() # 결측치 True / False 로 출력
    df.isna().sum() # 결측치 True의 개수 합 출력
    ```
    

### 데이터 전처리

- DataFrame 결측 치 기준
    
    
    | **결측 치 비율** | **처리방법** |
    | --- | --- |
    | 10% 미만 | 데이터 제거 또는 다양한 imputation |
    | 10% ~ 20% | 모델 기반 다중 대치, 단일 대치 |
    | 20% ~ 30% | 모델기반 다중 대치 |
    | 30% 이상 | 피처제거
    (결측 치 값이 30% 이상인 데이터들은 데이터의 완전성이 떨어지기 때문에 열 별 결측 값의 비율을 확인하여 삭제) |
- DataFrame 결측 치 처리
    - 삭제
        
        ```python
        df.dropna(axis=0) # 결측치 가지고 있는 행 모두 삭제
        df.dropna(axis=1) # 결측치 가지고 있는 열 모두 삭제
        ```
        
    - 단일 대치법: 단일 대체 값으로 인해 모수와 다른 평균으로 추정 되게 됨
        - 평균(mean) : 연속성 변수에서 결측 값을 제외한 평균으로 대치
        - 중앙값(median) : 연속성 변수에서 결측 값을 제외한 중앙값으로 대치
        - 최빈값(mode) : 범주형에서 결측 값 발생 시, 범주별로 빈도가 가장 큰 값으로 대치
            
            ```python
            df.fillna(df.mean()) # 평균
            df.fillna(df.median()) # 중앙값
            df.fillna(df.mode()) # 최빈값
            ```
            
    - 보간법(interpolation)
        - 선형 보간법: 특정 데이터를 지나는 선형함수를 사용하여 사이 값을 보간 하는 방법
        - 다항 보간법: 선형 보간법을 일반화한 것으로, 더 높은 차수의 다항식 함수를 사용해서 보간하는 방법
        - Ex) polynomial, spline ..
            
            ![Untitled](/images/extracurriculars-skada-core-2/0069.png)
            
            ```python
            df.interpolate(method='linear') # 선형
            df.interpolate(method='spline') # spline
            df.interpolate(method='cubic') # cubic
            df.interpolate(method='quadratic') # quadratic
            df.interpolate(method='polynomial') # 다항
            ```
            
- 시간과 장비 ID 별로 정리
    - variable : 시도호와 성공률 두 변수로 구성
    - src_nm : 총 9개의 기기
    - Variable 안에 있는 변수들을 모두 컬럼으로 추출하기 위해 `pivot_table`을 사용
    - index : pivot_table을 적용한 후 행 이름 으로 나타낼 정보가 담긴 컬럼
    - columns : pivot_table을 적용한 후 열에 나타낼 정보가 담긴 컬럼
    - aggfunc : pivot_table을 적용 시 중복된 데이터에 대해 어떤 연산을 적용할지 선택
