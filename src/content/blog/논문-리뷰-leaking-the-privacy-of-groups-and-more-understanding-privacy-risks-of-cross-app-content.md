---
title: "논문 리뷰 | Leaking the Privacy of Groups and More: Understanding Privacy Risks of Cross-App Content"
description: "Sharing in Mobile Ecosystem"
pubDate: 1970-01-01
---
Sharing in Mobile Ecosystem

date: 2025년 2월 17일
slug: lab-leaking-review
status: Public
tags: Review
type: Post
category: 🧪 Lab
updatedAt: 2025년 2월 19일 오후 8:38

## Paper Info

- **논문 제목**: **Leaking the Privacy of Groups and More: Understanding Privacy Risks of Cross-App Content Sharing in Mobile Ecosystem**
- **키워드**: LLM, Prompt Leaking, Adversarial Query, Optimization
- **학회**: Internet Society (ISOC) Network and Distributed System Security Symposium (NDSS) 2024
- **논문 링크**: [https://www.ndss-symposium.org/wp-content/uploads/2024-138-paper.pdf](https://www.ndss-symposium.org/wp-content/uploads/2024-138-paper.pdf)

## Summary

- 모바일 앱 간 콘텐츠 공유(Cracs)에서 개인정보 유출 위험을 분석한다.
- 기존 연구는 웹 기반 추적에 집중했으며, 모바일 환경에서의 공유 데이터 노출 문제는 충분히 다루어지지 않았다.
- Shark는 정적·동적 분석을 결합한 자동화된 탐지 도구로, 앱의 공유 기능이 개인정보를 유출하는지를 효과적으로 식별할 수 있다.

## 1. Introduction

- 모바일 앱 간 콘텐츠 공유(Cracs)는 널리 사용되지만, 개인정보 유출 위험이 존재
- 기존 연구는 웹 기반 추적에 집중했으며, 모바일 환경에서의 공유 데이터 노출 문제는 충분히 연구되지 않음
- Cracs는 사용자 관심사, 정치 성향, 심지어 성적 지향까지 노출할 가능성이 있음
- 일부 앱은 공유된 콘텐츠를 추적하여 사용자의 소셜 관계까지 유추하는 문제를 가짐
- 개인정보 유출 유형을 공유 행동 추적(SBT), 공유 데이터 가로채기(SDI), 공유자 데이터 노출(SDE)로 분류
- 300명의 사용자 연구 결과, 대부분이 개인정보 보호를 중요하게 여기지만 공유 과정에서의 위험을 인지하지 못함
- **Shark**라는 자동화 분석 도구를 개발하여 정적 및 동적 분석을 통해 개인정보 유출 여부를 감지함
- 300개의 인기 앱을 분석한 결과, 중국 앱의 55.83%, 미국 앱의 10.60%에서 개인정보 유출 문제 발견
- iOS 앱도 유사한 문제를 가지고 있으며, 81.69%의 앱이 개인정보 유출 위험을 포함
- 앱 개발자, 시스템 제공자, 앱 마켓이 협력하여 개인정보 보호 대책을 마련해야 함
- 연구 기여: Cracs의 개인정보 위험 분석, 사용자 인식 연구, 자동화 탐지 도구(Shark) 제안, 대규모 앱 분석 수행

## 2. Background and Problem Statement

- Cracs(모바일 앱 간 콘텐츠 공유)는 YouTube, TikTok 등의 **소스 앱**에서 Facebook Messenger, WeChat 같은 **타겟 앱**으로 URL을 통해 콘텐츠를 전달하는 방식
- Cracs는 주로 **SDK를 통해 구현되며**, 특정 소셜 미디어용 SDK 또는 여러 타겟 앱을 지원하는 **제3자 SDK**를 사용할 수 있음
- 이상적으로 공유 URL은 콘텐츠 식별 정보만 포함해야 하지만, **사용자 ID(uid)와 같은 추가 개인정보가 포함되는 경우가 많음**
- 이러한 추가 정보는 **사용자 추적에 악용될 가능성이 있으며**, GDPR, CCPA, PIPL 등의 개인정보 보호 규정을 위반할 수 있음
- 기존 연구는 모바일 앱의 데이터 수집과 추적에 초점을 맞췄지만, **Cracs 과정에서 발생하는 데이터 노출 문제는 충분히 연구되지 않음**
- **공격 모델(Threat Model)**:
    - Cracs 과정에서 **소스 앱, 타겟 앱, 제3자 SDK**가 사용자의 개인정보를 수집할 수 있음
    - **공격자는 소스 앱이나 제3자 SDK뿐만 아니라, 공유를 받은 사용자(sharee)일 수도 있음** (예: 공유된 URL에서 개인정보를 추출)
    - 피해자는 공유를 수행한 사용자(sharer)와 콘텐츠를 받은 사용자(sharee)이며, 이들은 자신도 모르게 **개인정보(신원, 관심사, 소셜 관계 등)를 노출할 수 있음**

## 3. Privacy Threats in Cross-App Content Sharing

- Cracs의 개인정보 유출 문제는 데이터 최소화(data minimization)와 최소 권한 원칙(least privilege)을 위반하는 설계로 인해 발생
- **데이터 최소화:** 공유되는 URL은 콘텐츠 접근에 필요한 최소한의 정보만 포함해야 하지만, 불필요한 사용자 정보가 포함됨
- **최소 권한:** Cracs는 소스 앱과 타겟 앱 간에 이루어지는 로컬 프로세스여야 하지만, 소스 앱이나 제3자 SDK가 불필요한 데이터를 수집함

### A. Sharing Behavior Tracking(SBT)

![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0103.png)

- 소스 앱이 **공유 URL에 사용자 추적기를 삽입하여 sharer를 지속적으로 추적**할 수 있음
- 콘텐츠를 확인하려는 sharee에게 **소스 앱 로그인 요구** 
→ sharee의 정보를 수집하여 **sharer와 sharee 간의 관계를 유추** 가능
- 결과적으로 소스 앱이 **이용자의 소셜 네트워크를 침해**하고, 친구 관계, 관심사 등을 추적할 수 있음

### B. Sharing Data Interception(SDI)

![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0104.png)

- 일부 소스 앱 또는 제3자 SDK는 **공유된 데이터를 앱 서버로 전송**하여 별도로 저장 및 분석
- Cracs는 기본적으로 **로컬에서 처리**되어야 하지만, **불필요하게 외부 서버로 전송**됨으로써 개인정보 유출이 발생함
- 예제 코드에서 **정상적인 공유 API 호출 외에 서버로 데이터를 추가 전송하는 방식이 확인됨**

### C. Sharer Data Exposure(SDE)

![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0105.png)

- 공유 URL에 **sharer의 사용자 ID(uid)나 계정 정보**가 포함될 경우, sharee가 이를 이용해 **sharer의 계정 정보를 직접 조회** 가능
- 일부 앱은 **공유된 콘텐츠 상단에 sharer의 사용자명을 직접 표시**하여 불특정 다수에게 개인정보를 노출시키기도 함
- 기술적 지식이 있는 sharee는 URL에서 정보를 추출해 **sharer의 과거 게시물, 좋아요, 팔로잉 정보 등을 수집**할 수 있음

## 4. Privacy Implications

- Cracs에서 발생하는 개인정보 유출은 사용자의 **프로필 정보 및 소셜 관계를 추론하는 데 악용될 수 있음**

### **A. User Profile Inference**

- SBT(공유 행동 추적) 및 SDI(공유 데이터 가로채기)를 통해 **소스 앱과 제3자 SDK가 사용자의 공유 활동을 수집 및 추적** 가능
- SDE(공유자 데이터 노출)를 통해 **sharee가 sharer의 프로필 정보를 직접 조회**할 수 있음
- 단순한 공개 정보가 아니라 **앱 간 데이터 연계를 통해 본래 의도보다 더 많은 정보가 유출될 가능성**이 있음
- 수집된 데이터는 **사용자의 나이, 성별, 정치 성향, 성적 지향 등을 분석하는 데 활용**될 수 있으며, 광고 및 마케팅 목적으로 악용될 위험이 존재

### **B. Social Relation Inference**

- SBT를 이용하면 **앱이 사용자의 친구, 가족, 특정 집단과의 관계를 파악**할 수 있음
- 소셜 관계 데이터는 단순한 프로필 정보보다 더 민감하며, 정치적 성향, 이동 패턴 등의 분석에 활용될 수 있음
- **예시:**
    - 사용자가 특정 플랫폼에서 콘텐츠를 공유한 기록을 분석해 **다른 소셜 플랫폼에서의 친구 목록을 추론**할 수 있음
    - 특정 유형의 상품(예: 아기 용품)을 공유하는 빈도를 분석해 **가족 관계를 유추**할 수 있음
    - HIV 처방약 관련 콘텐츠를 공유하는 패턴을 분석해 **건강 상태를 추론**할 가능성이 있음
- 사용자가 공유된 콘텐츠를 열지 않음으로써 추적을 피할 수도 있지만, 대부분의 경우 **sharer와 sharee는 서로 신뢰하는 관계이므로 이러한 회피 전략이 실효성이 낮음**

## 5. User Perception Analysis

- 연구 목표: **Cracs 사용 현황, 개인정보 유출 인식, 사용자의 개인정보 보호 의식, 공유 행태 변화**를 조사
- **300명의 참가자를 대상으로 설문조사 진행**, 대부분(90% 이상)이 대학 학위 이상 보유
- **Research Questions**
    - RQ1: How prevalent are Cracs functionalities used by app users?
    - RQ2: To what extent do users realize that their sharing activities result in privacy risks?
    - RQ3: How do users perceive the sensitivity of their data in Cracs, and to what extent are they willing to tolerate the potential privacy threats?
    - RQ4: How do users respond when they realize the real privacy implications within Cracs?
- **Findings**
    - **Cracs는 매우 일반적으로 사용됨**
        - 응답자 전원(100%)이 공유 기능을 사용하며, **94.67%가 최소 한 달에 한 번 이상 콘텐츠를 공유**
        - **36.34%는 매주 한 번 이상 공유**, Cracs가 일상적인 기능임을 보여줌
    - **사용자들은 Cracs로 인한 데이터 유출 위험을 충분히 인식하지 못함**
        - **86.22%가 기본적으로 로그인 상태에서 공유 기능을 사용**, 이로 인해 추적이 용이해짐
    - **로그인이 필요한 경우에도 59.67%가 공유를 위해 로그인**, sharee의 경우에도 65.33%가 로그인하여 공유 콘텐츠를 확인
    - **사용자들은 개인정보 보호를 중요하게 여기며, 데이터 유출을 용납할 수 없다고 생각함**
        - **94%가 공유 행동 추적(SBT)으로 인해 개인정보가 유출된다고 인식**
        - **81%는 공유 데이터 가로채기(SDI)가 개인정보 유출을 초래한다고 생각**
        - **73%는 공유자 데이터 노출(SDE)로 인해 민감한 정보가 노출된다고 판단**
        - **63.67%는 소스 앱이 자신들의 소셜 관계를 수집하는 것을 수용할 수 없다고 응답**
    - **개인정보 유출을 인지한 후, 사용자의 공유 의향이 크게 감소**
        - **55.33%는 개인정보 보호를 위해 공유를 포기할 의향이 있음**
        - **29.33%는 대안이 없어 공유를 지속하지만, 개인정보 유출을 우려**
        - **40.33%는 로그인 요구 시 공유하지 않겠다고 응답**, **34.67%는 로그인해야 볼 수 있는 콘텐츠라면 보지 않겠다고 응답**

## 6. Analyzing Cracs Data Practices in Mobile Apps

- **기존 방법의 한계:**
    - 기존 데이터 흐름 분석 도구는 **Cracs의 소셜 관계 유추(SBT)나 URL 내 사용자 정보 삽입을 감지하지 못함**
    - **코드 난독화로 인해 공유 API 탐지가 어려움**
    - **공유 활동을 동적으로 실행해야 하지만, 기존 도구는 이를 자동화하지 못함**
- **Shark의 분석 방식**
    
    ![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0106.png)
    
1. **정적 분석**
    - 앱의 코드와 UI 리소스를 분석하여 **공유 버튼을 찾고, 공유 API와의 연결을 확인**
    - 난독화된 코드에서도 **API 탐지가 가능하도록 고유한 패턴을 학습**
    - **앱 간 공유 과정(Activity Transition Graph, ATG)을 구축**하여 동적 분석을 위한 탐색 경로를 생성
2. **동적 분석**
    - **앱 실행 중 공유 버튼을 자동 클릭하여 공유 과정을 시뮬레이션**
    - 공유되는 데이터 및 네트워크 트래픽을 캡처하여 **개인정보 유출 여부를 검출**
3. **개인정보 유출 감지 방법**
    - **SBT 감지:** 서로 다른 계정이 동일한 콘텐츠를 공유할 때 URL이 변하는지 비교 
    → **사용자 식별 정보 포함 여부 확인**
    - **SDI 감지:** 공유된 콘텐츠가 **소스 앱이 아닌 외부 서버로 전송되는지 분석**
    - **SDE 감지:** 공유 링크에 **사용자 ID, 계정 정보 등이 포함되는지 검사**
- **Shark의 효과성 평가**
    
    ![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0107.png)
    
    - **300개 앱에서 587개의 공유 API를 추출**, 이 중 **32.5%는 난독화되어 있었음**
    - **10개 앱에서 수작업으로 확인한 공유 기능 368개 중 306개(83.15%)를 자동 탐지**하여 높은 탐색 성능을 입증
    - 평균 분석 시간은 **75.94초**, 최대 289.42초, 최소 10.36초로 **빠른 분석 속도를 보임**

## 7. Understanding Sharing Leaks in the Wild

- **300개의 인기 앱(중국 150개, 미국 150개)을 분석하여 Cracs의 개인정보 유출 현황을 조사함**
- **총 186개 앱이 공유 기능을 포함하고 있으며, 이 중 74개 앱에서 최소 하나의 개인정보 유출 패턴(SBT, SDI, SDE)이 확인됨**
- **중국 앱(55.83%)이 미국 앱(10.60%)보다 개인정보 유출 위험이 훨씬 높음**
    - **SBT(공유 행동 추적):** 중국 43.33%, 미국 7.57%
    - **SDI(공유 데이터 가로채기):** 중국 15.83%, 미국 4.54%
    - **SDE(공유자 데이터 노출):** 중국 21.67%, 미국 1.5%
- **Results**
    1. **소셜 관계 추적(SBT)**
        
        ![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0108.png)
        
        - 다수의 중국 앱이 **사용자 공유 활동을 추적하고, 친구 관계를 유추하는 패턴**을 보임
        - 일부 건강 관련 앱에서도 **사용자 관계를 추적하여 민감한 정보를 수집하는 정황 확인됨**
    2. **공유 데이터 가로채기(SDI)**
        
        ![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0109.png)
        
        - 22개 앱이 공유된 콘텐츠를 **자사 서버로 전송하여 사용자 데이터를 수집**
        - 특히, **제3자 SDK가 공유 데이터를 무단 수집하는 경우도 다수 발견됨(2개 SDK에서 13억 회 이상 다운로드된 앱에 통합됨)**
    3. **공유자 데이터 노출(SDE)**
        
        ![image.png](/images/논문-리뷰-leaking-the-privacy-of-groups-and-more-understanding-privacy-risks-of-cross-app-content/0110.png)
        
        - 중국의 인기 영상 앱(App-CN-3)에서 **사용자 UID가 공유 링크에 포함**되어 sharee가 쉽게 신원을 추적할 수 있음
        - 해당 앱은 이후 업데이트에서 **UI에서 공유자의 정보 노출을 삭제**, 일부 개인정보 보호 조치가 이루어짐
    4. **iOS 앱도 유사한 개인정보 유출 패턴을 보임**
        - Android에서 문제가 있는 74개 앱 중 **iOS 버전이 존재하는 71개 앱을 분석한 결과, 58개(81.69%)에서 동일한 개인정보 유출 패턴이 확인됨**
        - Android와 iOS 모두 **Cracs에서의 데이터 수집 및 공유 방식이 유사**하므로, 플랫폼을 가리지 않고 개인정보 유출 문제가 심각함

## 8. Discussion and Countermeasures

- **개인정보 보호를 위한 제안**
    - **앱 사용자**
        - **앱의 기본 공유 기능을 사용하지 않고, 스크린샷이나 이미지 형태로 공유**하면 추적을 방지할 수 있음
        - 하지만, **비디오·오디오 콘텐츠 공유 시 불편함이 발생**할 수 있음
    - **시스템 벤더(Android, iOS 플랫폼 제공업체)**
        - **공유 URL에서 사용자 신원을 노출하는 불필요한 매개변수를 필터링**할 수 있음
        - 하지만, **공격자가 무작위 URL 패턴을 사용하여 추적을 우회할 가능성**이 있음
        - 로그인 필수 콘텐츠의 경우, **이 방식이 효과적이지 않을 수도 있음**
    - **규제 기관 및 앱 마켓(Google Play, App Store 등)**
        - **개발자들이 "개인정보 보호 설계 원칙(privacy-by-design)"을 준수하도록 명확한 가이드라인을 제시해야 함**
        - **Google Play와 같은 앱 마켓이 개인정보 유출 가능성이 있는 앱을 사전 차단하는 검증 절차를 강화**할 필요가 있음
- **연구의 한계**
    - **사용자 연구가 중국에서만 진행되어, 다른 국가의 사용자 인식과 차이가 있을 가능성**이 있음
    - **Shark는 동적 UI 요소를 분석하지 못하며, 코드 난독화 및 암호화된 네트워크 트래픽이 있는 앱을 완벽히 분석할 수 없음**
    - **더 발전된 리버스 엔지니어링 기법을 적용하면 탐지 정확도를 향상시킬 수 있음**
