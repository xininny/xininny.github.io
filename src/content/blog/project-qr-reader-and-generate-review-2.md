---
title: "QR Reader & Generator | 크롬 확장프로그램 개발 회고"
description: "인터넷 브라우징 경험을 더욱 풍부하게 만들어주는 크롬 확장 프로그램은 브라우저의 기능을 확장하거나 사용자에게 편의성을 제공하는 작은 소프트웨어입니다."
pubDate: 2024-11-01
updatedDate: 2024-12-26
tags: ["CSS", "Chrome Extension", "HTML", "JavaScript"]
category: "🍎 Project"
---
## 프로젝트 개요

인터넷 브라우징 경험을 더욱 풍부하게 만들어주는 크롬 확장 프로그램은 브라우저의 기능을 확장하거나 사용자에게 편의성을 제공하는 작은 소프트웨어입니다. 

이번에 저는 QR 코드를 이미지로부터 해독하고, URL로부터 QR 코드를 생성할 수 있는 크롬 확장 프로그램인 **QR Reader & Generator**를 개발했습니다. 

이 글에서는 크롬 확장 프로그램이 무엇인지 소개하고, 제가 개발한 확장 프로그램의 기능과 개발 과정을 공유하고자 합니다.

### 크롬 확장 프로그램이란?

크롬 확장 프로그램은 구글 크롬 브라우저의 기능을 확장하거나 사용자 인터페이스를 변경할 수 있는 작은 소프트웨어입니다. 

HTML, CSS, JavaScript와 같은 웹 기술을 사용하여 개발되며, 사용자에게 다양한 기능과 편의를 제공합니다. 

확장 프로그램은 브라우저의 동작을 제어하거나 웹 페이지의 콘텐츠를 수정할 수 있으며, 생산성 향상, 보안 강화, 사용자 경험 개선 등 다양한 목적을 가집니다.

## QR Reader & Generator 소개

![Group 18308 (3).png](/images/project-qr-reader-and-generate-review-2/0019.png)

**QR Reader & Generator**는 다음과 같은 주요 기능을 제공합니다

- **이미지 업로드**: QR 코드가 포함된 이미지를 업로드하여 내용을 해독합니다.
- **클립보드 붙여넣기**: 클립보드에 복사된 이미지를 붙여넣어 QR 코드를 해독합니다.
- **QR 코드 생성**: 입력한 URL로부터 QR 코드를 생성하여 다운로드할 수 있습니다.

[**Chrome 웹 스토어에서 확장 프로그램 보기**](https://chromewebstore.google.com/detail/qr-reader-generator/ijpcbkmfaeepjimbaadgiafalbakolmg)

## 개발 과정

### 프로젝트 구조

```
QR Reader & Generator/
├── css/
│   ├── clipboard.css
│   ├── generate.css
│   └── image-upload.css
├── html/
│   ├── clipboard.html
│   ├── generate.html
│   └── image-upload.html
├── icons/
│   ├── icon.png
│   └── logo.png
├── images/
│   └── *.svg
├── js/
│   ├── clipboard.js
│   ├── generate.js
│   ├── image-upload.js
│   ├── jsQR.js
│   └── qrcode.min.js
├── manifest.json
└── package-lock.json
```

### QR 코드 해독 (image-upload.js)

```jsx
javascript
코드 복사
document.addEventListener("DOMContentLoaded", () => {
  const uploadContainer = document.querySelector(".Upload");
  const urlInput = document.querySelector(".url-input");
  urlInput.disabled = true;

  // 파일 선택 및 드래그 앤 드롭 기능 구현
  // 업로드된 이미지에서 QR 코드를 해독하여 URL 입력 필드에 표시
});
```

- **이미지 업로드 및 QR 코드 해독 로직**을 구현하였습니다.
- **jsQR.js** 라이브러리를 사용하여 이미지를 캔버스에 그린 후 QR 코드를 해독합니다.

### QR 코드 생성 (generate.js)

```jsx
javascript
코드 복사
document.addEventListener('DOMContentLoaded', function() {
    function generateQRCode() {
        const url = document.querySelector('.url-input').value;
        if (url) {
            // QR 코드 생성 및 표시
        } else {
            alert('Please enter a valid URL.');
        }
    }

    // 이벤트 리스너를 통해 버튼 클릭 시 QR 코드 생성 및 다운로드 기능 구현
});
```

- **qrcode.min.js** 라이브러리를 사용하여 입력된 URL로 QR 코드를 생성합니다.
- 생성된 QR 코드를 이미지로 표시하고, 다운로드할 수 있도록 기능을 구현하였습니다.

### 시스템 아키텍처

![image.png](/images/project-qr-reader-and-generate-review-2/0020.png)

## 확장 프로그램 설치 방법

확장 프로그램 등록 방법은 이전 글에 적어두었습니다.

[QR Reader & Generator | 크롬 확장 프로그램 등록 방법](https://xininny.vercel.app/project-qr-reader-and-generate-review-1/)

### 방법 1: 크롬 웹 스토어에서 설치

1. 크롬 브라우저에서 [**QR Reader & Generator**](https://chromewebstore.google.com/detail/qr-reader-generator/ijpcbkmfaeepjimbaadgiafalbakolmg) 페이지로 이동합니다.
2. **Chrome에 추가** 버튼을 클릭하여 설치합니다.
3. 설치 완료 후, 브라우저의 확장 프로그램 아이콘을 클릭하여 사용합니다.

### 방법 2: 수동으로 설치

1. 이 리포지토리를 클론하거나 ZIP 파일로 다운로드합니다.
    
    ```bash
    git clone https://github.com/xininny/qr-reader-generator.git
    ```
    
    또는 ZIP 파일을 다운로드하여 압축을 해제합니다.
    
2. 크롬 브라우저에서 주소창에 `chrome://extensions/`를 입력합니다.
3. 우측 상단의 **개발자 모드**를 활성화합니다.
4. **압축 해제된 확장 프로그램을 로드합니다** 버튼을 클릭합니다.
5. 다운로드한 폴더를 선택하여 확장 프로그램을 로드합니다.
6. 브라우저의 확장 프로그램 아이콘을 클릭하여 사용합니다.

## 검수 기간

1. 1차 반려
    - manifest.json에 적어둔 permission들 중 크롬 확장 프로그램에 필요치 않은 권한들이 있었습니다.
        
        ⇒ 권한 삭제
        
    - 팁이라면 대시 보드에서 새 항목 누를 필요 없이 새 패키지 업로드하면 새로운 압축 파일 올리는 표시가 뜨고 압축 파일 올리면 된다.
        
        ![image.png](/images/project-qr-reader-and-generate-review-2/0021.png)
        
2. 2차 반려
    - 개인정보 처리 할 것이 없어 작성하지 않았는데 알고 보니 꼭 작성해서 url을 입력해야 했었습니다.
        
        ⇒ 거창한 내용 들어갈 필요 없이 간단하게만 작성해도 되었습니다.
        
    - 꼭 새로운 페이지 만들 필요 없이 Docs에 문서로 작성해서 뷰어로 공개해도 통과되었습니다.
3. 배포
    
    앞선 반려 과정들을 거쳐 크롬 웹 스토어에 정식적으로 배포되었습니다.
    
    ![image.png](/images/project-qr-reader-and-generate-review-2/0022.png)
    

## 👏 Keep

1. 디자인부터 모든 코드들을 혼자 작성했다.
2. KISIA ICT융합 산업보안 융합보안크루에서 멈추지 않고 스스로 프로그램을 만들어보았다.

## ❓Problem

1. KISIA ICT융합 산업보안 융합보안크루로 활동할 때 만들던 기능들을 가져왔기에 문제는 없었다.

## ✅ Try

1. 지금은 프론트에서만 그치는 단순에 크롬 확장 프로그램을 만들었지만 이후에는 백엔드까지 통신해서 좀 더 어려운 크롬 확장 프로그램을 개발해 보고 싶다.

## 👩‍💻 정리하며

처음부터 끝까지 혼자서 만든 프로그램은 처음이었다.

디자인을 할 때는 다소 막막했지만 디자인만 마치고 나니 HTML, CSS는 금방이었다.

JS도 금방 했기에 정말 크롬 확장 프로그램을 스스로 만들고 정식적으로 등록해보는 것에 의의를 둔 프로젝트였다.

이 프로젝트 덕이 아닌 SecQR 덕분에 실력이 늘었지만 등록을 해본 것은 이번이 처음이었기에 내게는 좀 더 의미가 깊은 프로젝트가 될 것 같다.
