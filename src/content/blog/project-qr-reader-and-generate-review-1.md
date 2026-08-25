---
title: "QR Reader & Generator | 크롬 확장 프로그램 등록 방법"
description: "1. 구글 계정으로 로그인합니다. 2. Chrome 웹 스토어 개발자 대시보드에 접속합니다.(Chrome 웹 스토어(https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar&hl=ko))"
pubDate: 2024-10-31
updatedDate: 2024-12-26
tags: ["CSS", "Chrome Extension", "HTML", "JavaScript"]
category: "🍎 Project"
---
## 크롬 확장 프로그램 등록 방법

1. 구글 계정으로 로그인합니다.
2. **Chrome 웹 스토어 개발자 대시보드**에 접속합니다.([Chrome 웹 스토어](https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar&hl=ko))
    
    ![image.png](/images/project-qr-reader-and-generate-review-1/0005.png)
    
3. 확장프로그램을 등록하기 위해 등록 수수료(5$)를 결제합니다.
    
    ![image.png](/images/project-qr-reader-and-generate-review-1/0006.png)
    
4. 결제를 하고 나면 대시보드에 접속됩니다.
    
    ![image.png](/images/project-qr-reader-and-generate-review-1/0007.png)
    
5. **새 항목** 버튼을 클릭합니다.
6. **확장 프로그램의 ZIP 파일**을 업로드합니다.
    
    ![image.png](/images/project-qr-reader-and-generate-review-1/0008.png)
    
7. 상태, 패키지에는 적으실 항목은 없습니다.
8. 확장 프로그램의 **스토어 등록정보**를 작성합니다.
    
    ![image.png](/images/project-qr-reader-and-generate-review-1/0009.png)
    
    - 패키지 제목, 패키지 요약은 manifest.json에 입력하신 내용이 자동으로 입력되어 있습니다.
    - 설명은 크롬 웹 스토어에 개요에 들어갈 내용을 입력하는 란입니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0010.png)
        
    - 카테고리, 언어는 원하시는 것을 선택해주시면 됩니다.
    - 스토어 아이콘은 128x128 픽셀이어야 합니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0011.png)
        
    - 프로모션 동영상이 있다면 url을 입력하시면 됩니다.
    - 캡쳐화면은 최대 5개로 개요 위에 들어갈 사진입니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0012.png)
        
    - 작은 프로모션 타일은 프로모션 배너로 사용됩니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0013.png)
        
    - 마키 프로모션 타일은 크롬 웹 스토어의 메인 페이지 또는 특별 프로모션 섹션에서 큰 배너로 사용됩니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0014.png)
        
    - 그 외 추가로 입력하실 것이 있다면 입력하시면 됩니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0015.png)
        
9. 개인정보 보호에서도 마찬가지로 입력해주시면 됩니다. 
(여기에 적으시는 내용은 검수할 때 확인하는 내용이고 크롬 웹 스토어에는 게시되지 않습니다.)
    - 전용 목적 설명
    - 권한 요청 이유(manifest.json에 permission들을 적으셨다면 해당 권한들을 사용하는 이유를 적으셔야 합니다.)
    - 사용자 데이터 사용(해당하시는 부분에 체크하시면 됩니다.)
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0016.png)
        
    - 개인정보 처리 방침
        - 개인정보 처리 방침 URL을 입력해주시면 됩니다. 개인정보 처리 방침은 웹 스토어에서 사용자가 확인할 수 있습니다.
        - 사용자가 개인정보 보호에서 개인정보처리방침을 누르면 URL로 이동합니다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-1/0017.png)
        
10. 배포에는 해당하는 부분을 체크하시면 됩니다.
    
    ![image.png](/images/project-qr-reader-and-generate-review-1/0018.png)
    
11. 다 작성하고 제출하여 검토받기를 누르면 **심사 과정을 거쳐** 승인이 되면 웹 스토어에 게시됩니다.
