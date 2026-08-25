---
title: "논문 리뷰 | XDA: Accurate, Robust Disassembly with Transfer Learning"
description: "논문 제목 : XDA: Accurate, Robust Disassembly with Transfer Learning  Keyword : Disassembly, SelfSupervised Learning, Binary Analysis, Function Boundary R"
pubDate: 2024-08-22
updatedDate: 2025-02-05
tags: ["Review"]
category: "🧪 Lab"
---
## Paper Info

- **논문 제목** : **XDA: Accurate, Robust Disassembly with Transfer Learning**
- **Keyword** : Disassembly, Self-Supervised Learning, Binary Analysis, Function Boundary Recovery
- **학회** : NDSS 2021 (Network and Distributed System Security Symposium)
- **논문 링크** : [https://arxiv.org/pdf/2010.00770](https://arxiv.org/pdf/2010.00770)

## Summary

- **Issue:** 심볼이 제거된 바이너리에서 함수 경계와 어셈블리 명령어를 정확하고 강인하게 복원하는 것은 어렵다. 기존 디스어셈블러들은 휴리스틱이나 패턴 매칭에 의존하여 높은 최적화 수준에서는 정확도가 떨어진다.
- **Limitation of Previous Works:** 기존 기계학습 기반 접근법들은 훈련 데이터와 테스트 데이터 간 중복이 많아 일반화 성능이 낮으며, 특정 컴파일러 최적화 수준에서는 성능이 저하된다.
- **Contribution:**  XDA는 전이 학습을 활용하여 머신 코드의 문맥적 종속성을 학습하고 이를 통해 함수 경계 및 어셈블리 명령어를 보다 정확하고 강인하게 복원하는 프레임워크를 제안하며, 기존 최첨단 기법 대비 17.2% 높은 성능을 보였다.

## 1. Introduction

- 디스어셈블리는 악성 코드 분석과 리버스 엔지니어링 등에서 필수적이지만, 심볼 정보가 제거된 바이너리에서는 함수 경계와 명령어 복원이 어려움
- 기존 휴리스틱 기반 기법(IDA Pro 등)은 최적화된 바이너리에서 부정확하고, ML 기반 기법은 데이터 중복과 컴파일러 변화에 취약
- XDA는 전이 학습을 활용해 머신 코드의 바이트 간 종속성을 학습하고, 함수 경계 및 명령어 복원을 정확하고 강인하게 수행
- 사전 훈련(Masked LM)으로 바이트 간 문맥적 의미를 학습하고, 미세 조정(Fine-tuning)으로 디스어셈블리 정확도를 개선
- 3,121개 바이너리를 대상으로 평가한 결과, 함수 경계 복원에서 F1 Score 99.0%, 어셈블리 명령어 복원에서 99.7%를 달성하고 IDA Pro 대비 최대 38배 빠른 성능을 보임
- 다양한 플랫폼, 컴파일러 및 최적화 수준에서도 최소 98.5% 이상의 성능을 유지

## 2. Background

- 디스어셈블리는 함수 경계, 어셈블리 명령어, 제어 흐름 등을 복원하는 작업이며, 본 연구에서는 실행 오버헤드가 큰 동적 분석 대신 **정적 분석 방식**을 사용
- 함수 경계를 복원하는 것은 어려운 문제이며, 컴파일러 최적화로 인해 함수 시작(Prologue)과 종료(Epilogue) 패턴이 사라져 기존 방법(IDA Pro 등)은 함수 탐지에 실패할 가능성이 큼
- 어셈블리 명령어를 복원하는 것도 까다로운데, x86/x64의 **가변 길이 명령어와 코드-데이터 혼합 문제**로 인해 기존 정적 분석 도구들은 명령어 경계를 올바르게 구분하지 못하는 경우가 많음
- 기존의 휴리스틱 기반 디스어셈블러(IDA Pro, Ghidra 등)는 점프 테이블을 코드로 잘못 해석하거나, 최적화된 바이너리에서 함수 탐지를 실패하는 등의 한계를 가짐
- XDA는 전이 학습을 활용하여 머신 코드의 패턴과 의미를 학습함으로써, 최적화 수준이 다른 다양한 바이너리에서도 높은 정확도로 함수와 명령어를 복원할 수 있음

## 3. OVERVIEW OF OUR APPROACH

![image.png](/images/lab-xda-review/0137.png)

- XDA는 Masked LM 기반 전이 학습을 활용하여 머신 코드의 문맥적 종속성을 학습하고, 함수 경계 및 어셈블리 명령어 복원을 수행
- Masked LM 방식은 랜덤한 바이트를 가리고 주변 문맥을 기반으로 예측하도록 학습하여 머신 코드의 의미적 이해를 강화
- 함수 내부에서 `sub rsp, 0x28` 명령어의 일부를 가린 후 예측하도록 하면, 모델이 스택 할당 및 함수 시작 구조를 학습할 수 있음
    
    ![image.png](/images/lab-xda-review/0138.png)
    
- 점프 테이블의 바이트를 마스킹하고 예측하도록 하면, 모델이 코드와 데이터의 차이를 구별하는 능력을 갖출 수 있음
    
    ![image.png](/images/lab-xda-review/0139.png)
    
- 특정 프로그램(Vim) 바이너리를 학습 데이터에서 제거한 후에도 높은 예측 정확도를 유지하는 것으로 보아, 모델이 단순 패턴 암기가 아닌 머신 코드의 일반적인 의미를 학습했음을 확인할 수 있음

## 4. Threat Model

- XDA는 표준 컴파일러(GCC, ICC, MSVC)로 생성된 바이너리에 대해 강인성을 보장하며, 임의로 난독화된 코드에 대한 강인성은 목표로 하지 않음
- 컴파일러 최적화 변화에 대한 강인성을 중점적으로 평가하며, 학습되지 않은 높은 최적화 수준에서도 성능을 유지하는지 실험(Section VII-B)에서 검증
- 일반적인 디스어셈블러처럼, 소수의 오탐(False Positives) 및 미탐(False Negatives)은 허용 가능한 수준으로 간주
- 일부 바이너리 리라이팅(Binary Rewriting) 사례에서는 오탐이나 미탐이 절대 허용되지 않을 수도 있으나, XDA는 이러한 절대적 정확성을 강제하지 않음

## 5. Methodology

**General design**

![image.png](/images/lab-xda-review/0140.png)

- XDA는 기존 ML 기반 디스어셈블러인 **bi-RNN과 다르게 사전 훈련(Masked LM)과 자가 주의(Self-Attention) 기법을 활용**
- Transformer 기반의 **자가 주의 메커니즘**을 적용하여 RNN보다 **더 긴 범위의 바이트 종속성을 학습**할 수 있음

**Input representation**

- 입력 데이터는 바이트 단위로 처리되며, **각 바이트는 256차원의 원-핫 벡터로 변환됨**
- 추가적으로 **패딩(<PAD>), 시작(<S>), 종료(</S>), 마스킹(<MASK>) 등 특별 토큰을 포함**하여 학습 효율을 높임

**Pretraining task**

- **Masked LM을 활용한 사전 학습**을 진행하며, 일부 바이트를 <MASK>로 대체하고 주변 문맥을 통해 복원하는 방식으로 모델을 훈련
- 손실 함수는 **크로스 엔트로피**를 사용하여 마스킹된 바이트와 실제 바이트 간 차이를 최소화
    
    $\arg\min_{\theta} \sum_{i=1}^{|mpo s|} -x_i \log(\hat{x}_i)$
    

**Finetuning tasks**

- 사전 훈련된 임베딩을 기반으로 **미세 조정(Fine-tuning) 단계에서 함수 경계 및 어셈블리 명령어 복원**을 수행
- 출력 클래스는 `{S, E, N}`으로 구성되며, 각각 **함수 시작(Start), 함수 종료(End), 해당 없음(Neither)을 의미**
    
    $\arg\min_{\theta} \sum_{i=1}^{n} -y_i \log(\hat{y}_i)$
    

**Masked Language Model on Binaries**

- **위치 임베딩(Positional Embeddings)을 추가하여 바이트의 위치 정보를 유지**하며, 동일한 바이트라도 문맥에 따라 다르게 학습할 수 있도록 했음
- **멀티 헤드(Self-Attention) 메커니즘을 사용하여 모든 바이트 간의 관계를 학습**하며, 특히 장거리 의존성을 효과적으로 반영했음

**Distilling the Learned Semantics**

- 학습된 임베딩을 활용하여 **2-layer MLP를 사용한 최종 분류 작업을 수행**
- 모델이 학습한 문맥적 의미를 활용하여 **디스어셈블리 성능을 향상**시킴

**Masking Input Bytes**

- 사전 학습 시 **입력 바이트의 20%를 랜덤하게 마스킹**하고,
    - 이 중 50%는 `<MASK>`로 대체
    - 나머지 50%는 랜덤 바이트로 교체하여 모델이 특정 토큰에 의존하지 않도록 했음
- **동적 마스킹(Dynamic Masking) 기법을 적용하여, 매 epoch마다 다른 바이트를 마스킹**함으로써 학습 일반화 성능을 높임

## 6. Implementation and Experimental Setup

### **Learning Module & Environment**

- XDA는 **PyTorch 1.4.0, CUDA 10.1, CUDNN 7.6.3** 환경에서 구현되었으며, **Fairseq toolkit**을 활용하여 Self-Attention 기반 아키텍처를 구축
- 모델의 학습과 추론은 **Ubuntu 18.04, Intel Xeon E5-2623(16코어), 256GB RAM, 3×Nvidia GTX 1080-Ti GPUs** 환경에서 수행

### **Datasets**

![image.png](/images/lab-xda-review/0141.png)

- **SPEC CPU2017**은 39개의 C/C++/Fortran 프로그램을 포함하며, GCC-9.2(Linux)와 MSVC 2019(Windows)를 사용해 x86 및 x64 아키텍처에서 4가지 최적화 수준(O1, O2, Ox, Od 등)으로 컴파일하여 총 **588개의 바이너리**를 생성
- **SPEC CPU2006**은 이전 세대의 SPEC 벤치마크로, 19개의 프로그램을 포함하며 GCC-5.1.1(Linux)와 MSVC 2008(Windows)를 사용해 컴파일하여 총 **333개의 바이너리**를 생성
- **BAP 데이터셋**은 오픈소스 프로그램 136개(Vim 포함)로부터 생성된 **2,200개의 바이너리**로 구성되며, 일부는 Windows 환경에서, 나머지는 Linux의 ELF 바이너리로 포함되어 있음

### **Baselines**

- XDA의 성능을 평가하기 위해 **기존 디스어셈블러인 IDA Pro v7.4, Ghidra v9.1, objdump**와 비교
- 함수 경계 복원 성능을 비교하기 위해 **Nucleus(Control-flow 분석 기반)** 및 bi-RNN(Shin et al.)과도 성능을 비교
- Shin et al.의 bi-RNN 소스코드가 공개되지 않았기 때문에, 논문을 기반으로 **2-layer bi-RNN(hidden size=16) 모델을 PyTorch로 재구현하여 실험을 수행**

### **Label Collection**

- 함수 경계 및 어셈블리 명령어 복원의 정확도를 측정하기 위해 **PDB 파일(Dia2dump)과 DWARF 정보(pyelftools)를 활용하여 Ground Truth 라벨을 수집**
- Windows 바이너리에서는 PDB 파일을 사용하여 함수 경계를 추출하고, Linux에서는 DWARF 정보를 사용하여 정확한 함수 경계를 확보
- 어셈블리 명령어 복원에서는 **Capstone 라이브러리를 이용하여 명령어 경계를 추출**하였으며, 특정 함수 구조(thunks, trampolines)는 분석에서 제외

### **Metrics**

- 성능 평가는 **Precision, Recall, F1 Score**를 기반으로 수행되었으며, 이는 **불균형한 라벨 분포 문제를 해결하기 위한 대안적인 성능 지표**로 사용
- **Masked LM 사전 학습 성능은 Perplexity(PPL) 지표를 활용하여 평가**하였으며, 모델이 마스킹된 바이트를 얼마나 정확하게 예측하는지를 측정
- 일반화 성능을 평가하기 위해 **Train-test Overlap Rate**을 측정하여 학습 데이터와 테스트 데이터 간의 중복률을 분석

### **Pretraining Setup**

- 사전 학습(Pretraining) 과정에서 데이터의 철저한 분리를 보장하기 위해, **각 데이터셋 페어(SPEC CPU2017, SPEC CPU2006, BAP)별로 모델을 사전 훈련한 후, 다른 데이터셋을 사용해 미세 조정(Finetuning)을 수행**
- 예를 들어, SPEC CPU2017에서 보고된 모든 결과는 **SPEC CPU2006과 BAP에서 사전 훈련된 모델을 사용하여 미세 조정된 후 평가됨**
- 사전 학습에는 **레이블이 없는 대규모 데이터셋만 사용**되었으며, 학습 공정성을 유지하기 위해 **훈련, 미세 조정, 테스트 데이터가 절대 중복되지 않도록 설정**

### **Finetuning Setup**

- 미세 조정(Finetuning) 과정에서는 **각 데이터셋의 10%만을 학습 데이터로 사용하고, 나머지 90%를 테스트 데이터로 활용하여 일반화 성능을 극대화**
- 일부 데이터셋(BAP)은 함수 중복도가 높아 학습이 쉬운 문제가 있었으나, **훈련 데이터 비율을 낮추어 모델이 단순히 암기하는 것을 방지**
- XDA는 5 epochs만에 수렴하였으나, Shin et al.의 bi-RNN과 공정한 비교를 위해 **모두 30 epochs까지 학습을 진행함**
- Shin et al.의 실험 환경을 재현하기 위해, **bi-RNN 모델을 CPU에서 2시간 이상 학습시키도록 설정하여 논문의 실험 조건을 유지**

## 7. Evaluation

### **RQ1: Accuracy**

- XDA는 함수 경계 복원에서 **F1 Score 99% (기존 최고 성능 대비 +17.2%)**, 어셈블리 명령어 복원에서 F1 Score 99.7%를 달성하며, 모든 플랫폼, ISA, 컴파일러에서 최고 성능을 기록
    
    ![image.png](/images/lab-xda-review/0142.png)
    
- 기존 도구(objdump)는 모든 바이트를 명령어로 해석하여 높은 F1 Score를 보이나, 실제 난이도가 높은 경우(예: 인라인 데이터 포함)에는 실패
- **고난이도 최적화 수준(O3, O2)에서 XDA의 성능 차이는 더욱 두드러지며, 기존 모델(bi-RNN, Nucleus 등)의 한계를 극복**
    
    ![image.png](/images/lab-xda-review/0143.png)
    

### **RQ2: Robustness**

- XDA는 **다양한 최적화 수준에서도 강인한 성능(>98.8% F1 Score)을 유지**하며, 기존 모델(bi-RNN)은 최적화 수준이 높아질수록 성능이 저하됨
    
    ![image.png](/images/lab-xda-review/0144.png)
    
- **전이 학습(Transferability) 실험에서, 특정 최적화 수준(O1)에서 학습한 XDA가 다른 최적화 수준(O2, Od, Ox)에서도 >98.5% F1 Score를 유지**하며 일반화 성능을 입증
    
    ![image.png](/images/lab-xda-review/0145.png)
    
- 난독화 코드(Obfuscated binaries)에서도 XDA는 98~99.2%의 F1 Score를 유지하며, **난독화 유형(Bogus Control Flow, Instruction Substitution 등)에 관계없이 높은 복원 성능을 보임**
    
    ![image.png](/images/lab-xda-review/0146.png)
    

### **RQ3: Execution Time**

- XDA는 **IDA Pro 대비 최대 38배, Ghidra 대비 최대 26배 빠른 속도**로 함수 경계를 복원
- **GPU 가속을 활용할 경우 CPU 대비 최대 10배 빠른 속도를 기록**하며, CPU에서도 IDA 및 Ghidra보다 빠른 실행 속도를 보임
    
    ![image.png](/images/lab-xda-review/0147.png)
    

### **RQ4: Training Efficiency**

- **XDA는 bi-RNN 대비 4배 적은 데이터(2개의 훈련 바이너리)로도 F1 Score 0.9 이상을 달성**하며, **bi-RNN은 8개 이상의 바이너리를 필요로 함**
- **bi-RNN은 28 epochs 필요하지만, XDA는 단 2 epochs만에 동일한 F1 Score를 달성**하여 학습 효율이 높음을 입증
    
    ![image.png](/images/lab-xda-review/0148.png)
    

### **RQ5: Pretraining Effectiveness**

- **XDA의 사전 학습(Pretraining)은 다양한 플랫폼/컴파일러/ISA에서 일반화 가능하며, 단일 모델을 여러 환경에서 활용할 수 있음**
    
    ![image.png](/images/lab-xda-review/0149.png)
    
- **100% 사전 학습 데이터를 활용할 경우, 첫 번째 epoch에서 이미 94% 이상의 F1 Score를 기록**하며, 미세 조정(Finetuning)이 진행될수록 98% 이상으로 수렴
    
    ![image.png](/images/lab-xda-review/0150.png)
    
- **사전 학습을 하지 않을 경우, bi-RNN보다 성능이 낮아지지만, 사전 학습이 진행되면 성능이 급격히 향상**됨을 확인함
- **Transformer 기반의 Self-Attention 구조가 GPU 병렬화에 적합하여, bi-RNN 대비 100배 이상 빠르게 학습 가능**하며, 긴 시퀀스에서도 효율적임을 입증함

## 8. Case Studies

### **A. Probing Learned Semantics**

- **Predicting instructions**
    
    ![image.png](/images/lab-xda-review/0151.png)
    
    - XDA는 Windows x64의 호출 규약(calling convention)을 학습하여 인자 전달(register 사용 순서 r9, r8, rdx, rcx)을 이해하고, 올바른 명령어를 예측
    - 명령어의 의미(Context-aware semantics)를 학습하여, 같은 바이트(c3)가 문맥에 따라 다른 의미(예: ret 또는 다른 명령어)를 가질 수 있음을 구별
- **Predicting the gaps between functions**
    
    ![image.png](/images/lab-xda-review/0152.png)
    
    - 함수 사이의 패딩 바이트(cc)를 마스킹한 후 예측한 결과, XDA는 **함수의 프롤로그(prologue)와 에필로그(epilogue)를 인식하여 올바르게 복원**
    - 마스킹된 패딩 바이트의 앞뒤 맥락을 분석하여, XDA가 함수 시작과 끝을 자동으로 인식하는 능력을 가졌음을 입증
- **Predicting jump table entries**
    
    ![image.png](/images/lab-xda-review/0153.png)
    
    - XDA는 **점프 테이블(jump table) 내의 엔트리를 정확히 예측**하였으며, 점프 타겟 주소를 결정하는 가장 하위 바이트의 예측 확률이 낮아짐을 확인
    - **반복되는 패턴을 학습하면서도 단순한 패턴 매칭에 의존하지 않고, 문맥을 고려한 예측을 수행**함을 보임
- **Predicting local variable allocation size**
    
    ![image.png](/images/lab-xda-review/0154.png)
    
    - XDA는 **스택 포인터(rsp)를 조정하는 명령어(sub rsp, 0x28)를 정확히 예측**
    - 스택 해제 명령어(add rsp, 0x28)를 참조하여 **로컬 변수 할당 크기(0x28)를 추론**할 수 있음을 보여, 단순한 패턴 학습이 아닌 의미적 이해를 하고 있음을 입증

### **B. Attention Visualization**

![image.png](/images/lab-xda-review/0155.png)

- XDA가 **로컬 변수 할당(sub rsp, 0x28) 예측 시 집중하는 패턴을 시각화**한 결과, 함수의 **프롤로그(push rdi, push r14) 및 에필로그(add rsp, 0x28, pop r15 등)에 높은 주의를 기울임**을 확인
- 이를 통해 **XDA가 함수 내부 구조를 학습하여, 함수의 시작과 끝을 감지하고 로컬 변수 할당 크기를 결정할 수 있음**을 입증

## 9. Conclusion

- XDA는 전이 학습(Transfer Learning)을 활용한 새로운 디스어셈블링 기법으로, 머신 코드의 의미를 학습하여 다양한 디스어셈블리 작업을 정확하고 강인하게 수행
- 함수 경계 복원에서 기존 최고 성능 대비 17.2% 향상, 어셈블리 명령어 복원에서는 F1 Score 99.7%를 기록하며, 최고 성능을 달성
- 다양한 컴파일러, 아키텍처, 플랫폼, 최적화 수준에서도 높은 강인성을 유지하며 일반화 성능을 입증
- 디스어셈블리 및 바이너리 분석 전반에 활용 가능하며, 함수 및 명령어 복원 외에도 다양한 응용 가능성을 제시
- XDA는 오픈소스로 코드가 공개되어있음 ([https://github.com/CUMLSec/XDA](https://github.com/CUMLSec/XDA))
