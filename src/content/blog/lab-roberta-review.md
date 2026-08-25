---
title: "논문 리뷰 | RoBERTa: A Robustly Optimized BERT Pretraining Approach"
description: "논문 제목 : RoBERTa: A Robustly Optimized BERT Pretraining Approach  Keyword : BERT, RoBERTa, Pretraining, Optimization, NLP  학회 : ICLR 2020(The Internati"
pubDate: 2024-11-20
updatedDate: 2025-02-05
tags: ["Review"]
category: "🧪 Lab"
draft: true
---
## Paper Info

- **논문 제목** : **RoBERTa: A Robustly Optimized BERT Pretraining Approach**
- **Keyword** : BERT, RoBERTa, Pretraining, Optimization, NLP
- **학회** : ICLR 2020(The International Conference on Learning Representations)
- **논문 링크** : [https://arxiv.org/pdf/1907.11692](https://arxiv.org/pdf/1907.11692)

## Summary

- **Issue:** 기존 언어 모델의 사전 학습은 제한된 데이터 크기와 하이퍼파라미터 선택으로 인해 성능 향상이 제대로 이루어지지 않았다.
- **Limitation of Previous Works:** BERT는 충분히 학습되지 않았으며, 중요한 설계 선택들이 제대로 반영되지 않았다.
- **Contribution:** RoBERTa는 BERT의 학습 과정을 개선하여 더 긴 학습 시간, 더 큰 배치 크기, 더 많은 데이터 사용, 동적 마스킹 등을 적용해 GLUE, SQuAD, RACE에서 최첨단 성능을 달성했다.

## 1. Introduction

- 언어 모델 사전 학습은 성능 향상에 크게 기여했지만, 접근법 간의 세부 비교는 여전히 어려움
- 학습 과정은 계산적으로 비용이 크며, 학습 데이터 크기와 하이퍼파라미터 튜닝이 성능에 큰 영향을 미침
- 기존 연구들은 제한된 데이터와 과소 학습으로 인해 BERT의 잠재력을 충분히 발휘하지 못함
- 이 연구에서는 BERT의 사전 학습을 재현하고, 데이터 크기와 설계 선택이 성능에 미치는 영향을 체계적으로 분석
- RoBERTa는 Pretraining 방식에서 다음 4가지 개선 방안을 제시
    - 더 긴 학습 시간 동안 더 큰 배치 크기와 더 많은 데이터를 활용
    - 기존의 Next Sentence Prediction(NSP)을 제거
    - 더 긴 시퀀스에서 학습
    - 학습 데이터에 적용되는 마스킹 패턴을 동적으로 변경
- 이를 통해 GLUE, RACE, SQuAD에서 기존의 BERT를 뛰어넘는 성능을 달성하며, BERT의 학습 목표가 여전히 경쟁력이 있음을 입증

## 2. Background

- BERT는 대규모 텍스트 corpus를 활용한 사전 학습과 후속 다운스트림 작업의 미세 조정을 통해 자연어 처리에서 중요한 성능 향상을 이룸
- 사전 학습은 Masked Language Model(MLM)과 Next Sentence Prediction(NSP) 두 가지 목표를 기반으로 진행됨
- 이 논문에서는 BERT의 주요 설계와 학습 과정을 재현하고 분석한 내용을 소개
- BERT에 대한 더 자세한 내용은 [BERT 논문](https://arxiv.org/abs/1810.04805) 참고

## 3. Experimental Setup

### 3.1 Implementation

- BERT를 FAIRSEQ 라이브러리로 재구현하고, 하이퍼파라미터를 원본과 동일하게 설정하였으나 일부 조정(예: 학습률 및 Adam epsilon 값)을 통해 성능과 안정성을 개선
- 입력 시퀀스는 최대 512 토큰으로 고정하였으며, 짧은 시퀀스 학습을 포함하지 않고 전체 시퀀스를 사용하는 방식으로 개선
- NVIDIA V100 GPU를 활용하여 혼합 정밀도 부동 소수점 연산으로 학습 속도를 최적화

### 3.2 Data

- **BOOKCORPUS + WIKIPEDIA (16GB):** 원래 BERT 학습에 사용된 데이터셋
- **CC-NEWS (76GB):** CommonCrawl에서 수집된 6천 3백만 개의 영어 뉴스 기사로 구성된 대규모 데이터셋
- **OPENWEBTEXT (38GB):** Reddit에서 3개 이상의 업보트를 받은 URL에서 콘텐츠를 추출한 데이터셋
- **STORIES (31GB):** Winograd schema와 유사한 스타일로 필터링된 CommonCrawl 데이터
- 총 160GB 이상의 데이터를 활용하여 기존 BERT 학습 데이터(16GB)를 크게 확장

### 3.3 Evaluation

- **GLUE (General Language Understanding Evaluation):** 9개의 데이터셋으로 구성된 자연어 이해 작업 벤치마크
    - 각 작업별로 단일 작업 미세 조정을 수행하고, 개발 세트에서 성능을 비교
    - 일부 작업에서는 MNLI로 미리 학습된 모델을 활용해 RTE, STS, MRPC의 성능을 향상시킴
- **SQuAD (Stanford Question Answering Dataset):** 주어진 문맥에서 질문의 답변을 추출하는 작업
    - V1.1: 항상 문맥에 답이 존재
    - V2.0: 문맥에 답이 없을 수 있는 경우를 포함
    - 기존 데이터 증강 없이 SQuAD 제공 데이터만 사용해 모델을 미세 조정하고, V2.0에서는 질문의 정답 가능성을 분류하는 추가 손실을 학습에 반영
- **RACE (Reading Comprehension from Examinations):** 중국 중·고등학교 영어 시험에서 추출된 대규모 독해 데이터셋
    - 문맥, 질문, 4개의 선택지로 구성된 질문에 대해 올바른 답을 선택하는 작업
    - 각 선택지와 질문-문맥 쌍을 연결한 후, [CLS] 표현을 분류 레이어로 입력하여 답을 예측

## 4.  Training Procedure Analysis

### 4.1 Static vs. Dynamic Masking

- **Static Masking:** 기존 BERT는 학습 전에 마스킹 패턴을 고정하여 데이터를 준비하고, 동일한 마스크를 여러 번 학습에 사용. 이를 위해 데이터를 10배 복제하여 학습 도중 동일한 패턴이 여러 번 등장하도록 함
- **Dynamic Masking:** RoBERTa는 학습 시마다 새로운 마스킹 패턴을 생성하여 중복된 데이터를 사용하지 않도록 함
- **결과:** 동적 마스킹은 BERT의 정적 마스킹과 유사하거나 약간 더 나은 성능을 보였으며, 특히 긴 학습 단계나 대규모 데이터에서 유리한 것으로 나타남
    
    ![image.png](/images/lab-roberta-review/0130.png)
    

### 4.2 Model Input Format and Next Sentence Prediction (NSP)

- **SEGMENT-PAIR + NSP:** 기존 BERT는 두 개의 문서 조각을 입력으로 사용하고, NSP 손실을 통해 이 문서들이 연속적인지 예측하도록 학습
- **FULL-SENTENCES (NSP 제거):** NSP를 제거하고 문서 내 문장을 최대 512 토큰으로 연결하여 입력으로 사용하는 방식을 도입
- **DOC-SENTENCES:** 문서 경계를 유지하며 512 토큰 이내로 문장을 입력으로 구성하는 방식으로 학습
- **결과:** NSP를 제거한 FULL-SENTENCES 방식이 SEGMENT-PAIR 방식보다 성능이 좋았으며, DOC-SENTENCES는 FULL-SENTENCES보다 약간 더 높은 성능을 보임. 이로 인해 RoBERTa는 NSP를 제거한 FULL-SENTENCES 방식을 최종적으로 채택
    
    ![image.png](/images/lab-roberta-review/0131.png)
    

### 4.3 Training with Large Batches

- **기존 설정:** BERT는 256개의 시퀀스를 배치 크기로 사용하고, 100만 번의 학습 단계를 수행
- **개선:** RoBERTa는 배치 크기를 2K, 8K까지 증가시키고 학습률을 조정하여 같은 계산 비용으로 학습 속도를 향상시킴
- **결과:** 대규모 배치 학습은 퍼플렉시티(perplexity)를 감소시키고, GLUE 및 SQuAD와 같은 다운스트림 작업에서 더 높은 정확도를 달성
    
    ![image.png](/images/lab-roberta-review/0132.png)
    

### 4.4 Text Encoding

- **기존 BERT:** 30K 크기의 캐릭터 기반 BPE(Byte Pair Encoding)를 사용하여 토큰화를 수행
- **RoBERTa:** 50K 크기의 바이트 기반 BPE를 도입하여 유니코드 문자 대신 바이트 단위로 토큰화를 진행
- **결과:** 바이트 기반 BPE는 모든 텍스트를 처리할 수 있는 범용 인코딩을 제공하였으며, 일부 작업에서 약간의 성능 저하가 있었지만 더 큰 유연성을 확보함

### 추가 결과

- 각 개선 사항은 독립적으로 실험되었으며, 동적 마스킹, 대규모 배치 학습, NSP 제거, 바이트 기반 BPE 모두 RoBERTa의 성능을 높이는 데 기여

## 5. RoBERTa

- RoBERTa는 기존 BERT의 사전 학습 과정을 개선한 "Robustly optimized BERT approach"로, 성능 최적화를 위해 동적 마스킹, NSP 제거, 대규모 배치, 바이트 기반 BPE를 통합한 모델
- 학습 데이터 크기와 학습 단계 수라는 두 가지 중요한 요소를 추가로 분석하여, 이러한 요소들이 모델 성능에 미치는 영향을 체계적으로 평가

### Pretraining Configuration

- **모델 아키텍처:** BERTLARGE 아키텍처(L=24, H=1024, A=16, 355M 파라미터)를 기반으로 설정
- **학습 데이터:** BOOKCORPUS + WIKIPEDIA(16GB) 데이터로 시작하여, 이후 CC-NEWS, OPENWEBTEXT, STORIES를 포함한 160GB의 대규모 데이터로 확장
- **학습 단계:** 초기 10만(100K) 단계 학습에서 시작하여, 이후 30만(300K) 및 50만(500K) 단계로 학습을 확장
- **하드웨어:** 1024개의 NVIDIA V100 GPU를 사용하여 대규모 학습을 병렬화

### Results: Combined Effects of Improvements

- 데이터 크기와 학습 단계를 점진적으로 늘리면서, GLUE, SQuAD, RACE에서 기존 BERTLARGE와 XLNet을 초월하는 성능을 확인
- **100K 단계:** 기존 BERTLARGE보다 높은 성능을 기록하며 설계 변경 사항의 효과를 입증
- **300K 단계:** 성능이 꾸준히 향상되어, 대부분의 다운스트림 작업에서 XLNetLARGE를 능가
- **500K 단계:** 여전히 과적합(overfitting) 없이 성능이 향상되었으며, 데이터 크기와 학습 단계가 성능에 중요한 영향을 미침을 보여줌
    
    ![image.png](/images/lab-roberta-review/0133.png)
    

### 5.1 GLUE Results

- GLUE에서 RoBERTa는 단일 작업 기반 미세 조정과 앙상블 두 가지 설정에서 실험을 진행
- **단일 작업 미세 조정:**
    - 각 작업별로 배치 크기(16, 32)와 학습률(1e-5, 2e-5, 3e-5)을 조정하여, 10 에포크 동안 학습 및 조기 종료(early stopping)를 적용
    - 9개의 작업 모두에서 최고 성능을 기록하며, 기존 BERTLARGE와 XLNetLARGE를 능가
- **앙상블 테스트:**
    - MNLI로 사전 미세 조정된 모델을 기반으로 RTE, STS, MRPC 작업에서 성능을 개선
    - GLUE 리더보드에서 9개 작업 중 4개에서 최고 성능을 기록하며 평균 점수에서도 선두를 차지함
    
    ![image.png](/images/lab-roberta-review/0134.png)
    

### 5.2 SQuAD Results

- SQuAD 1.1과 2.0 데이터셋에서 RoBERTa는 추가 데이터 증강 없이 제공된 데이터만을 사용하여 학습
- **SQuAD 1.1:**
    - 기존 BERT와 동일한 미세 조정 절차를 사용하여 XLNet과 동등한 최고 성능을 기록
- **SQuAD 2.0:**
    - 질문의 정답 가능성을 예측하는 이진 분류기를 추가로 학습시켜 XLNet보다 0.4점(EM) 및 0.6점(F1) 높은 성능을 달성
    - 리더보드에서도 데이터 증강 없이 학습된 단일 모델 중 최고 성능을 기록

![image.png](/images/lab-roberta-review/0135.png)

### 5.3 RACE Results

- RACE는 중·고등학생을 대상으로 한 독해 작업으로, RoBERTa는 질문과 각 선택지를 문맥과 결합하여 입력으로 사용
- 입력이 512 토큰을 초과하는 경우, 질문-선택지를 128 토큰으로 제한하고 나머지를 문맥으로 구성
- **결과:**
    - RACE 테스트 데이터에서 중학교와 고등학교 모두에서 최고 성능을 기록하였으며, 특히 고난도 질문에서 XLNet을 초과하는 성과를 보임

![image.png](/images/lab-roberta-review/0136.png)

이 실험들은 RoBERTa의 설계와 데이터 확장이 모델 성능을 효과적으로 향상시킨다는 점을 입증

## 6. Related Work

### 6.1 Pretraining Objectives

- 사전 학습(pretraining)은 다양한 학습 목표를 기반으로 설계됨
    - **Language Modeling:** 문장 생성을 목표로 하는 학습 (Dai and Le, 2015; Peters et al., 2018; Howard and Ruder, 2018)
    - **Machine Translation:** 번역 작업을 기반으로 한 학습 (McCann et al., 2017)
    - **Masked Language Modeling:** 문장에서 일부 단어를 가리고 이를 예측하도록 하는 학습 (Devlin et al., 2019; Lample and Conneau, 2019)

### 6.2 Fine-Tuning Approaches

- 많은 최근 연구들은 기본적인 접근법으로 사전 학습 후 각 다운스트림 작업에 맞게 모델을 미세 조정하는 방식을 사용 (Howard and Ruder, 2018; Radford et al., 2018)

### 6.3 Advanced Methods

- 최근에는 성능을 향상시키기 위해 다양한 기술이 도입됨
    - **Multi-Task Fine-Tuning:** 여러 작업을 동시에 학습하여 모델을 더욱 일반화 (Dong et al., 2019)
    - **Entity Embeddings:** 개체 임베딩을 추가하여 정보 표현력을 강화 (Sun et al., 2019)
    - **Span Prediction:** 특정 범위를 예측하도록 학습 (Joshi et al., 2019)
    - **Autoregressive Pretraining Variants:** 여러 종류의 자기회귀 사전 학습 방법 (Song et al., 2019; Chan et al., 2019; Yang et al., 2019)

### 6.4 Data and Model Scaling

- **모델 크기 확대 및 데이터 증가:** 더 큰 모델과 더 많은 데이터를 사용하면 성능이 꾸준히 향상되는 경향이 있음 (Devlin et al., 2019; Baevski et al., 2019; Yang et al., 2019; Radford et al., 2019)

### 6.5 Research Goal

- 이 연구는 기존의 다양한 방법론을 보다 잘 이해하기 위한 기준점을 제공하기 위해 BERT의 학습 과정을 재현, 단순화, 조정하는 것을 목표로 함

## 7. Conclusion

- 이 연구는 BERT 모델의 사전 학습 과정에서 여러 설계 선택의 영향을 체계적으로 평가
- **주요 개선 사항:**
    1. 더 긴 학습 시간
    2. 더 큰 배치 크기
    3. 더 많은 데이터 활용
    4. Next Sentence Prediction(NSP) 손실 제거
    5. 더 긴 시퀀스 학습
    6. 동적 마스킹 패턴 적용
- 이러한 개선을 바탕으로 RoBERTa는 GLUE, RACE, SQuAD에서 최첨단 성능을 달성
    - GLUE: 멀티태스크 학습 없이도 최고 성능 기록
    - SQuAD: 추가 데이터 없이 학습해 기존 모델을 초월
- 결과적으로 BERT의 사전 학습 목표(masked language modeling)가 여전히 경쟁력 있는 접근법임을 입증
- RoBERTa는 새로운 데이터셋(CC-NEWS)을 포함하여 학습되었으며, 학습 및 미세 조정을 위한 모델과 코드를 공개
    - 모델과 코드는 [GitHub](https://github.com/pytorch/fairseq)에서 확인 가능함
