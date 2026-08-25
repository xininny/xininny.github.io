---
title: "Record | 노션 기반 블로그 템플릿 morethan-log 커스터마이징"
description: "블로그 플랫폼을 고르며 다양한 시도를 해봤다."
pubDate: 2024-02-01
updatedDate: 2024-12-20
tags: ["Morethanlog"]
category: "💾 Record"
---
## morethan-log?

블로그 플랫폼을 고르며 다양한 시도를 해봤다. 

Gatsby, Velog, Tistory 등을 사용해 봤지만, 어느 하나에 정착하기가 쉽지 않았다. 

그러던 중, 노션과 연동되는 오픈 소스 블로그 템플릿 **morethan-log**를 알게 되었고, 노션을 자주 사용하는 나로서는 반가운 소식이었다.

[https://github.com/morethanmin/morethan-log](https://github.com/morethanmin/morethan-log)

직접 사용해보니, 노션에서 글을 쓰고 바로 배포할 수 있는 편리함 덕분에 자연스럽게 이 블로그로 정착하게 되었다. 

정착하면서 여러 기능을 커스터마이징했고, 특히 유용했던 몇 가지를 공유하려고 한다.

## 참고

[Teddistory | 김테디의 기술 블로그](https://blog.teddy-kim.com/)

## 커스터마이징

### 이모지 변경

**기본 이모지 :**

![image.png](/images/record-morethan-log/0023.png)

**변경된 이모지 :**

![image.png](/images/record-morethan-log/0024.png)

- 코드(src/components/Emoji.tsx)
    
    ```jsx
    import { ReactNode } from "react"
    
    type Props = {
      className?: string
      children?: ReactNode
    }
    
    export const Emoji = ({ className, children }: Props) => {
      return (
        <span className={className}>
          {children}
        </span>
      )
    }
    ```
    

### Service 항목 삭제

**삭제 전 :**

![image.png](/images/record-morethan-log/0025.png)

**삭제 후 :** 

![image.png](/images/record-morethan-log/0026.png)

Service는 원하는 링크로 변경해서 사용할 수 있지만 아직 포트폴리오나 추가적인 나만의 사이트가 없어 삭제했다.

- 코드(site.config.js)
    
    ```jsx
        role: "",
        bio: "",
        email: "@gmail.com",
        linkedin: "",
        github: "",
        instagram: "",
      },
      // projects: [
      //   {
      //     name: `morethan-log`,
      //     href: "https://github.com/morethanmin/morethan-log",
      //   },
      // ],
      projects: undefined,
      // blog setting (required)
      blog: {
    ```
    
- 코드(src/routes/Feed/ServiceCard.tsx)
    
    ```jsx
    import { CONFIG } from "site.config"
    import React from "react"
    import { AiFillCodeSandboxCircle } from "react-icons/ai"
    import styled from "@emotion/styled"
    import { Emoji } from "src/components/Emoji"
    
    type ProjectType = {
      name: string
      href: string 
    }
    
    const ServiceCard: React.FC = () => {
      if (!CONFIG.projects) return null
    
      const projects: ProjectType[] = CONFIG.projects ?? []
    
      return (
        <>
          <StyledTitle>
            <Emoji>🌟</Emoji> Service
          </StyledTitle>
          <StyledWrapper>
            {projects?.map((project, idx) => (
              <a
                key={idx}
                href={`${project.href}`}
                rel="noreferrer"
                target="_blank"
              >
                <AiFillCodeSandboxCircle className="icon" />
                <div className="name">{project.name}</div>
              </a>
            ))}
          </StyledWrapper>
        </>
      )
    }
    ```
    

### Tag 이름 정렬

**정렬 전 :** 

![image.png](/images/record-morethan-log/0027.png)

**정렬 후 :** 

![image.png](/images/record-morethan-log/0028.png)

기본적으로 태그가 정렬되지 않아 이름순으로 정렬되도록 수정했다.

- 코드(src/routes/Feed/TagList.tsx)
    
    ```jsx
    import styled from "@emotion/styled"
    import { useRouter } from "next/router"
    import React from "react"
    import { Emoji } from "src/components/Emoji"
    import { useTagsQuery } from "src/hooks/useTagsQuery"
    
    type Props = {}
    
    const TagList: React.FC<Props> = () => {
      const router = useRouter()
      const currentTag = router.query.tag || undefined
      const data = useTagsQuery()
    
      const handleClickTag = (value: any) => {
        // delete
        if (currentTag === value) {
          router.push({
            query: {
              ...router.query,
              tag: undefined,
            },
          })
        }
        // add
        else {
          router.push({
            query: {
              ...router.query,
              tag: value,
            },
          })
        }
      }
    
      const sortedTags = Object.keys(data).sort()
    
      return (
        <StyledWrapper>
          <div className="top">
            <Emoji>🏷️</Emoji> Tags
          </div>
          <div className="list">
            {sortedTags.map((key) => (
              <a
                key={key}
                data-active={key === currentTag}
                onClick={() => handleClickTag(key)}
              >
                {key}
              </a>
            ))}
          </div>
        </StyledWrapper>
      )
    }
    
    export default TagList
    ```
    

### Pretendard 폰트 추가

일부 UI에 Pretendard 폰트가 적용되지 않아 누락된 부분을 수정했다.

- 코드(src/routes/Detail/components/NotionRenderer/index.tsx)
    
    ```jsx
    import "katex/dist/katex.min.css"
    import { FC } from "react"
    import styled from "@emotion/styled"
    import { pretendard } from "src/assets"  // 추가
    
    ...
    
    const StyledWrapper = styled.div`
      /* // TODO: why render? */
      .notion-collection-page-properties {
        display: none !important;
      }
      .notion-page {
        padding: 0;
        font-family: ${pretendard.style.fontFamily}; // 추가
        .notion-row {
          .notion-column {
            // @media (max-width: 767px) {
              padding-top: 3px;
              padding-bottom: 3px;
            // }
          }
        }
    ```
    

### 카테고리 색깔 사용자 지정

기존 카테고리는 내가 원하는 색깔로 지정할 수 없어 원하는 색으로 설정할 수 있도록 변경했다.

![image.png](/images/record-morethan-log/0029.png)

- 코드(src/components/Category/index.tsx)
    
    ```jsx
    import { useRouter } from "next/router";
    import React from "react";
    import { COLOR_SET, CUSTOM_COLOR_SET } from "./constants";
    import styled from "@emotion/styled";
    import { colors } from "src/styles";
    
    export const getColorClassByName = (name: string): string => {
      if (CUSTOM_COLOR_SET[name]) {
        return CUSTOM_COLOR_SET[name];
      }
    
      try {
        let sum = 0;
        name.split("").forEach((alphabet) => (sum = sum + alphabet.charCodeAt(0)));
        const colorKey = sum.toString(16)?.[sum.toString(16).length - 1].toUpperCase();
        return COLOR_SET[colorKey];
      } catch {
        return COLOR_SET[0];
      }
    };
    
    type Props = {
      children: string;
      readOnly?: boolean;
    };
    
    const Category: React.FC<Props> = ({ readOnly = false, children }) => {
      const router = useRouter();
    
      const handleClick = (value: string) => {
        if (readOnly) return;
        router.push(`/?category=${value}`);
      };
    
      return (
        <StyledWrapper
          onClick={() => handleClick(children)}
          css={{
            backgroundColor: getColorClassByName(children),
            cursor: readOnly ? "default" : "pointer",
          }}
        >
          {children}
        </StyledWrapper>
      );
    };
    
    export default Category;
    
    const StyledWrapper = styled.div`
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 9999px;
      width: fit-content;
      font-size: 0.875rem;
      line-height: 1.25rem;
      opacity: 0.9;
      color: ${colors.dark.gray1};
    `;
    
    ```
    
- 코드(src/components/Category/constants.ts)
    
    ```jsx
    export const COLOR_SET: Record<string, string> = {
      0: "rgb(186 230 253)",
      1: "rgb(254 205 211)", 
      2: "rgb(245 208 254)", 
      3: "rgb(221 214 254)", 
      4: "rgb(191 219 254)", 
      5: "rgb(204 251 241)",
      6: "rgb(187 247 208)", 
      7: "rgb(254 249 195)",
      8: "rgb(186 230 253)",
      9: "rgb(254 202 202)",
      A: "rgb(231 229 228)",
      B: "rgb(226 232 240)",
      C: "rgb(252 231 243)",
      D: "rgb(233 213 255)",
      E: "rgb(199 210 254)",
      F: "rgb(209 250 229)",
    }
    
    export const CUSTOM_COLOR_SET: Record<string, string> = {
      "💾 Record": "rgb(216, 208, 255)",
      "🍎 Project":"rgb(255, 216, 216)",
      // 이런 식으로 카테고리명:rgb 를 추가하면 된다
    };
    ```
    

## 마무리

노션을 애용하는 사용자라면 **morethan-log**는 정말 추천할 만한 블로그 템플릿이다. 

글 쓰기와 배포가 간단하고, 커스터마이징도 자유로워 오랜 시간 유지할 수 있는 블로그 환경을 제공한다.

앞으로도 이 블로그를 메인 플랫폼으로 활용하며 지속적으로 개선해 나갈 계획이다. 

노션을 자주 이용하는 사람에게는 완전 추천한다.😊
