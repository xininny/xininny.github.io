---
title: "논문 리뷰 | PLeak: Prompt Leaking Attacks against Large Language Model Applications"
description: "논문 제목: PLeak: Prompt Leaking Attacks against Large Language Model Applications  키워드: LLM, Prompt Leaking, Adversarial Query, Optimization  학회: ACM Con"
pubDate: 2025-01-06
updatedDate: 2025-02-05
tags: ["Review"]
category: "🧪 Lab"
draft: true
---
## Paper Info

- **논문 제목**: **PLeak: Prompt Leaking Attacks against Large Language Model Applications**
- **키워드**: LLM, Prompt Leaking, Adversarial Query, Optimization
- **학회**: ACM Conference on Computer and Communications Security (CCS) 2024
- **논문 링크**: [https://arxiv.org/pdf/2405.06823](https://arxiv.org/pdf/2405.06823)

## Summary

- **Issue:** 기존의 LLM 애플리케이션은 시스템 프롬프트를 보호해야 하지만, 프롬프트 유출 공격(prompt leaking attack)에 취약하다.
- **Limitation of Previous Works:** 기존의 프롬프트 유출 공격은 수동으로 제작된 쿼리에 의존하여 효과적이지 않고 확장성이 부족하다.
- **Contribution:** PLeak은 최적화된 적대적 쿼리를 생성하여 시스템 프롬프트를 점진적으로 유출하는 자동화된 공격 기법을 제안하며, 실제 LLM 애플리케이션에서도 높은 유출 성능을 보인다.

## 1. Introduction

- LLM 애플리케이션은 시스템 프롬프트를 기반으로 작동하며, 이는 지적 재산으로 보호
- 프롬프트 유출 공격은 시스템 프롬프트를 도용하여 개발자의 지적 재산을 침해하는 공격 방식
- 기존 연구는 수동 제작된 쿼리를 활용하여 프롬프트를 유출하려 했으나, 확장성과 효과성이 부족했음
- 기존의 jailbreak 공격 기법과 프롬프트 유출 공격은 목적이 다르며, 기존 기법을 변형해도 효과적이지 않음
- PLeak은 자동화된 프롬프트 유출 공격 기법으로, 최적화된 적대적 쿼리를 생성하여 프롬프트를 점진적으로 유출함
- PLeak은 증분 탐색(incremental search) 기법을 통해 시스템 프롬프트의 일부부터 점진적으로 최적화하며, 후처리(post-processing) 기법을 활용해 다중 쿼리 응답을 조합하여 프롬프트를 복원
- 방어 기법으로 응답 필터링이 있을 수 있으나, PLeak은 적대적 변환(adversarial transformation) 을 적용하여 우회 가능
- PLeak은 오프라인 및 실환경에서 평가되었으며, 실환경 LLM 애플리케이션(Poe 플랫폼)에서 68%의 정확도로 시스템 프롬프트를 복원
- 기존 연구는 20% 이하의 복원율을 보였으며, 기존 jailbreak 공격을 변형한 방법은 18%의 복원율을 기록

## 2. Overview

![image.png](/images/lab-pleak-review/0111.png)

### **2.1 Definitions: Large Language Model (LLM) and LLM Applications**

- **LLM (Large Language Model)**: 주어진 토큰 시퀀스를 기반으로 다음 토큰을 예측하는 모델이며, autoregressive 방식으로 응답 생성
- **디코딩 전략**
    - **Beam-search**: 가장 높은 확률을 가진 여러 개의 토큰 후보를 선택하여 최적의 응답 생성
    - **Sampling**: 확률이 높은 토큰뿐만 아니라 다양한 토큰을 선택하는 방식(Top-k, Top-p 샘플링 포함)
    - **Beam-sample**: Beam-search와 Sampling을 결합하여 응답의 일관성과 다양성 조절
- **LLM Application**: 사용자 쿼리를 받아 시스템 프롬프트와 결합한 후, 백엔드 LLM을 통해 응답을 생성하는 애플리케이션
    
    $r = f(q) = f_{\theta}(p_t \oplus q)$
    

### **2.2 Problem Formulation**

- 목표: 적대적 쿼리(adversarial query)와 후처리(post-processing) 함수를 최적화하여 시스템 프롬프트를 유출
- 공식적으로, 여러 개의 적대적 쿼리를 LLM 애플리케이션에 입력하고, 그 응답을 조합하여 원래의 시스템 프롬프트를 재구성
    
    $p_r = P(f(q_{\text{adv}}^1), ..., f(q_{\text{adv}}^n)) 
    = P(f_{\theta}(p_t \oplus q_{\text{adv}}^1), ..., f_{\theta}(p_t \oplus q_{\text{adv}}^n))$
    
- **위협 모델(Threat Model)**
    - **대상(target) LLM 애플리케이션**: 특정 NLP 작업을 수행하며, 시스템 프롬프트는 보호됨
    - **공격자(adversary)**: 시스템 프롬프트를 유출하는 것이 목표이며, LLM 애플리케이션을 폐쇄형(black-box) 접근 방식으로만 사용할 수 있음(쿼리 입력 가능하지만 내부 모델 접근 불가)

### **2.3 High-Level Overview of PLeak**

- PLeak의 전체적인 과정은 두 개의 주요 단계로 구성됨
    - **Phase 1: 오프라인 적대적 쿼리 최적화 (Offline AQ Optimization)**
        1. 초기 적대적 쿼리(AQ)와 그림자 시스템 프롬프트 데이터셋(𝐷𝑠) 및 그림자 LLM을 사용하여 적대적 쿼리 최적화
        2. 그림자 LLM의 응답과 그림자 시스템 프롬프트 간의 손실을 계산하고, 이를 기반으로 적대적 쿼리를 반복적으로 업데이트
        3. 방어 우회를 위해 **적대적 변환(adversarial transformation)** 적용(예: 접두어 추가, 단어 순서 변경)
    - **Phase 2: 대상 시스템 프롬프트 재구성 (Target System Prompt Reconstruction)**
        1. 최적화된 적대적 쿼리를 대상 LLM 애플리케이션에 입력
        2. 응답을 수집하여 변환을 되돌리고, 여러 응답의 공통 부분을 추출하여 시스템 프롬프트를 복원

## 3. PLeak

### **3.1 Phase 1: Offline AQ Optimization**

- **적대적 쿼리(AQ) 최적화 개요**
    - LLM의 대규모 어휘로 인해 적대적 쿼리 탐색 공간이 크며, 국소 최적화(local optima)에 빠질 가능성이 있음
    - PLeak은 최적화를 작은 단계로 나누어 점진적으로 수행하여 효과적인 AQ를 생성
    - 시스템 프롬프트의 초기 토큰이 더 중요한 역할을 하므로, 먼저 앞부분을 최적화한 후 점진적으로 전체를 재구성
    - **Gradient-based search** 방식을 사용하여 AQ의 토큰을 효율적으로 최적화
- **적대적 목표 (Adversarial Objective)**
    - 목표: AQ를 최적화하여 그림자 LLM이 그림자 시스템 프롬프트(𝑝𝑠)를 출력하도록 유도
    - 그림자 프롬프트(𝑝𝑠)의 임베딩 벡터 시퀀스를 자동회귀 방식으로 학습하여 다음 토큰이 예상한 프롬프트를 출력할 확률을 극대화
    - 확률을 극대화하는 방향으로 최적화를 수행하는 손실 함수(Loss Function) 정의
- **적대적 목표 분할 및 단계별 최적화**
    - 시스템 프롬프트를 여러 개의 세그먼트(segment)로 나누어 점진적으로 최적화
    - 먼저 처음 t개의 토큰을 재구성하도록 최적화한 후, 점진적으로 길이를 확장
    - Taylor 근사(Taylor expansion) 를 사용하여 손실 함수 최적화 문제를 해석적으로 접근
    - 상위 k개 후보 토큰을 선택하여 최적의 임베딩 벡터를 찾고, 반복적으로 업데이트
- **적대적 쿼리 생성 (Adversarial Query Generation)**
    - **Algorithm 1**: 점진적 탐색 수행(Incremental Search)
        
        ![image.png](/images/lab-pleak-review/0112.png)
        
        1. 초기 AQ를 랜덤 토큰 또는 특정 문장으로 초기화
        2. 시스템 프롬프트의 최대 길이를 계산
        3. **각 단계마다** 최적화된 AQ를 생성하여 점진적으로 시스템 프롬프트 복원
    - **Algorithm 2**: 최적화된 AQ 생성(generateAQ)
        
        ![image.png](/images/lab-pleak-review/0113.png)
        
        1. 초기 AQ를 임베딩 벡터로 변환
        2. 각 토큰에 대해 손실 값을 평가하고, 상위 k개 후보 토큰을 선택하여 업데이트
        3. 손실이 더 이상 감소하지 않을 때까지 반복
        4. 최적화된 임베딩 벡터를 다시 AQ로 변환하여 반환

### **3.2 Phase 2: Target System Prompt Reconstruction**

- **대상 시스템 프롬프트 복원 과정**
    - 1단계: **적대적 변환을 제거하여 원본 응답을 복원**
        - 일부 방어 기법(예: 필터링)을 우회하기 위해 적대적 변환(예: 접두어 추가, 단어 순서 변경)을 적용
        - 후처리 과정에서 원본 프롬프트를 복원하기 위해 변환을 역으로 수행
    - 2단계: **여러 개의 AQ 응답을 비교하여 최적의 시스템 프롬프트 선택**
        - 서로 다른 AQ들이 생성하는 응답을 비교하여 가장 긴 공통 텍스트를 시스템 프롬프트로 복원
- **Algorithm 3 (post-process)**: 대상 시스템 프롬프트 복원
    
    ![image.png](/images/lab-pleak-review/0114.png)
    
    1. 여러 개의 적대적 쿼리를 생성하여 타겟 LLM 애플리케이션에 입력
    2. 응답을 수집하고, 적대적 변환을 되돌려 원본 텍스트를 복원
    3. 모든 응답 쌍을 비교하여 가장 긴 공통 문장을 대상 시스템 프롬프트로 선택
    4. 복원된 시스템 프롬프트를 최종 결과로 반환

## 4. Implementation and Experimental Setup

### **4.1 PLeak Implementation**

- **개발 환경**
    - Python 3.10 및 PyTorch 2.0 사용
    - HuggingFace의 LLM 및 텍스트 생성 방법 활용
    - Bitsandbytes를 사용하여 추론 가속화 및 혼합 정밀도 적용
    - NVIDIA A100 GPU 4대를 사용하여 실험 수행
    - 오픈소스 구현: [GitHub 링크](https://github.com/BHui97/PLeak)

### **4.2 Target LLM Applications**

- **오프라인 LLM 애플리케이션**
    - 다섯 개의 벤치마크 데이터셋을 사용하여 시스템 프롬프트 구성
    - 각 데이터셋에서 샘플링된 그림자 데이터셋(𝐷𝑠) 을 활용하여 AQ 생성
    - 5개의 LLM 모델을 사용하여 평가:
        
        ![image.png](/images/lab-pleak-review/0115.png)
        
    - 70억 개 파라미터를 가진 LLM의 AQ 생성에는 A100 GPU에서 약 2시간 소요
- **실환경(real-world) LLM 애플리케이션**
    - Poe 플랫폼에서 50개의 공개 시스템 프롬프트를 가진 LLM 애플리케이션을 랜덤으로 선택하여 실험
    - 평균 토큰 수: 96.55 ± 61.25
    - 실험 편의를 위해 공개 프롬프트를 사용했으나, PLeak의 성능은 공개/비공개 여부에 영향을 받지 않음
    - PLeak의 설정:
        - **오프라인 그림자 LLM**(LLaMA-2) 기반으로 최적화된 4개의 AQ 사용
        - **적대적 변환(adversarial transformation)**: 각 문장에 접두어(prefix) 추가

### **4.3 Evaluation Metrics**

- **Substring Match (SM) Accuracy (↑)**: 타겟 시스템 프롬프트가 재구성된 프롬프트의 부분 문자열(substring) 이면 성공으로 간주
- **Exact Match (EM) Accuracy (↑)**: 타겟 시스템 프롬프트와 재구성된 프롬프트가 완전히 일치해야 성공으로 간주
- **Extended Edit Distance (EED) (↓)**: Levenshtein 거리 기반 유사도 측정(값이 0에 가까울수록 유사함)
- **Semantic Similarity (SS) (↑)**: 문장 임베딩의 코사인 유사도(cosine similarity) 기반으로 의미적 유사도를 측정(-1~1 범위)

### **4.4 PLeak and Baseline Settings**

- **PLeak 기본 설정**
    - AQ 길이, 그림자 데이터셋 크기, 최적화 단계 크기(𝑠) 등 데이터셋별 설정이 존재
    - AQ 초기화 방식:
        1. **Random Initialization**(랜덤 토큰) → 기본 설정
        2. **Human Initialization**(사전 정의된 문장)
        3. **Mixed Initialization**(사전 정의된 문장 + 랜덤 토큰)
- **Baseline 비교 실험**
    - **수동 제작된 프롬프트 기반 방법**
        1. **Manually-crafted prompt-1** (Zhang et al.)
        2. **Manually-crafted prompt-2** (Perez et al.)
    - **최적화된 프롬프트 기반 방법**
    3. **GCG-leak**: GCG(Jailbreak 기법) 변형 버전
    4. **AutoDAN-leak**: AutoDAN 변형 버전
    - 여러 개의 AQ가 존재할 경우 가장 성능이 좋은 결과를 사용하여 평가
    - EM, SM 정확도는 하나의 응답이라도 일치하면 성공으로 판단하며, EED와 SS는 가장 좋은 응답을 기준으로 측정

## 5. Evaluation

### **RQ1: Prompt Leaking Attack Performance**

- PLeak은 모든 데이터셋과 LLM에서 기존 SOTA 기법을 능가하는 성능을 보임
- **Substring Match (SM) 및 Exact Match (EM) 정확도**
    
    
    ![image.png](/images/lab-pleak-review/0116.png)
    
    ![image.png](/images/lab-pleak-review/0117.png)
    
    - PLeak은 대부분의 경우 0.9 이상의 SM 정확도를 달성
    - 기존 방법(Manually-crafted prompts, Optimized prompts)은 SM 정확도가 낮고, 특히 Perez et al. [8] 방법은 대부분의 경우 0에 가까운 성능을 보임
    - PLeak은 다양한 LLM에서도 높은 EM 성능을 유지하며, 평균 EM 정확도 0.823을 기록
- **Extended Edit Distance (EED) 및 Semantic Similarity (SS)**
    
    ![image.png](/images/lab-pleak-review/0118.png)
    
    - PLeak은 가장 낮은 EED(↓) 및 높은 SS(↑) 점수를 기록하며, 시스템 프롬프트의 정보 보존력이 가장 뛰어남
    - 특히 Vicuna 모델이 상대적으로 공격에 강하지만, 여전히 PLeak이 충분한 정보를 추출 가능

### **RQ2: Attacks against Real-world LLM Applications on Poe**

- 실환경 LLM 애플리케이션(Poe) 50개를 대상으로 평가.
    
    ![image.png](/images/lab-pleak-review/0119.png)
    
- PLeak은 모든 평가 지표에서 기존 방법보다 높은 성능을 기록
    - SM: 0.72 (기존 방법 대비 3배 이상 성능 향상)
    - EM: 0.68 (PLeak 단일 AQ 기준 0.42 → 다중 AQ 적용 시 0.68로 향상)
    - EED 및 SS 점수 또한 PLeak이 기존 기법보다 월등히 우수
- 기존 기법(GCG-leak, AutoDAN-leak)은 일부 정보를 유출하지만, PLeak이 점진적 탐색 방식으로 보다 효과적으로 시스템 프롬프트를 복원

### **RQ3: Parameter Analysis**

- **그림자 데이터셋 크기(Shadow Dataset Size)**
    
    ![image.png](/images/lab-pleak-review/0120.png)
    
    - 그림자 데이터셋 크기가 클수록 공격 성능이 향상됨
    - EM/SM 정확도가 0.401 → 0.728 (그림자 샘플 2개 → 8개)
- **AQ 길이(AQ Length)**
    - AQ 길이가 길어질수록 공격 성능이 증가하지만, 16 토큰 이상부터는 증가폭이 둔화됨
- **예제 개수(Exemplars in Target Prompts)**
    
    ![image.png](/images/lab-pleak-review/0121.png)
    
    - 시스템 프롬프트 내 예제 수가 증가할수록 공격 난이도가 증가
- **AQ 초기화 방식(Initialization Mode)**
    
    ![image.png](/images/lab-pleak-review/0122.png)
    
    - 랜덤 초기화(Random Initialization)가 가장 높은 성능을 보임
- **디코딩 전략(Decoding Strategy)**
    
    ![image.png](/images/lab-pleak-review/0123.png)
    
    - Beam-search를 사용할 경우 공격 성공률이 가장 높고, Sampling을 사용할 경우 낮아짐
- **최적화 단계 크기(Step Size in Incremental Search)**
    - 작은 스텝 크기를 사용할수록 최적화가 더 효과적으로 진행됨

### **RQ4: Transferability**

- **다른 LLM 간 전이성(Transferability across Different LLMs)**
    
    
    ![image.png](/images/lab-pleak-review/0124.png)
    
    ![image.png](/images/lab-pleak-review/0125.png)
    
    - 한 모델에서 최적화된 AQ가 다른 LLM에서도 높은 공격 성능을 유지
    - 예: LLaMA-2에서 최적화된 AQ를 OPT에 적용 시 SM/EM 1.0 달성
- **다른 데이터셋 간 전이성(Transferability across Different Datasets)**
    
    ![image.png](/images/lab-pleak-review/0126.png)
    
    - 데이터셋이 다르더라도 일정 수준의 공격 성능 유지
    - Financial ↔ Tomatoes 데이터셋 간 전이성이 가장 높음(0.995 SM)
- **다른 LLM 및 데이터셋 조합에서도 높은 성능 유지**
    
    ![image.png](/images/lab-pleak-review/0127.png)
    

### **RQ5: PLeak against Potential Defenses**

- **시스템 프롬프트 강화 방어(System Prompt Enhancement Defenses)**
    
    ![image.png](/images/lab-pleak-review/0128.png)
    
    - **매개변수화(Parameterization)**: 프롬프트 유출 방지를 위한 추가 지시문 삽입 → PLeak에 큰 영향 없음
    - **따옴표 사용(Quotes & Formatting)**: PLeak의 성능 감소(SS 점수 하락), 그러나 여전히 높은 성공률 유지
- **필터 기반 방어(Filter-based Defense)**
    
    ![image.png](/images/lab-pleak-review/0129.png)
    
    - 시스템 프롬프트 문장을 응답에서 제거하는 필터 적용
    - 대부분의 기존 기법이 필터링에 의해 완전히 차단됨(EM 0)
    - 그러나 PLeak은 적대적 변환(adversarial transformation) 적용으로 필터를 우회하여 EM 0.3, SM 0.34를 기록
- **추가적인 방어 기법 및 우회 전략**
    - 방어 기법: LLM 응답과 시스템 프롬프트의 유사도를 평가하여 필터링, 적대적 프롬프트 탐지 기술 적용 가능
    - 우회 전략: 다수의 AQ 및 변환 기법을 조합하여 점진적으로 프롬프트 유출

## 6. Discussion

### **Ethics**

- **개인정보 보호**: 공개된 시스템 프롬프트만 사용, 비공개 프롬프트와 성능 차이 없음
- **책임 있는 정보 공개**: 2023년 12월 Poe 측에 유출 가능성 알림, 논문 공개 전 45일 대응 기간 제공

### **Real-world Attack Deployment**

- **공격 성공 여부 평가 어려움**: 원본 프롬프트와 비교 불가능 → PRSA 방식(응답 분포 비교) 활용 가능
- **미래 연구 과제**: 실제 공격 환경에서의 적용 가능성 및 방어 기법 탐구 예정

## 7. Conclusion

- LLM 애플리케이션은 **시스템 프롬프트와 사용자 입력을 결합**하여 NLP 작업을 수행함
- PLeak은 **최초의 자동화된 프롬프트 유출 공격** 기법으로, 최적화된 적대적 쿼리를 활용하여 시스템 프롬프트를 유출함
- **그림자 데이터셋과 그림자 LLM을 사용하여 적대적 쿼리를 최적화**한 후, 이를 타겟 LLM에 적용하는 방식
- **적대적 변환(adversarial transformation)을 활용**하여 LLM 응답을 변형하고, 역변환을 통해 원본 프롬프트를 복원 가능
- PLeak은 **오프라인 및 실환경 LLM 애플리케이션 평가에서 기존 방법보다 월등한 성능**을 보임
- 기존의 수동 제작된 적대적 쿼리 및 이전 jailbreak 공격 기반 최적화 기법보다 **훨씬 높은 프롬프트 유출 성공률**을 기록
