---
emoji: 𝐏
title: Python | 5. 들여쓰기
date: '2024-02-18 00:00:00'
author: xininny
tags: Python 들여쓰기
categories: Python
---

파이썬이 다른 언어와의 모양 상에서의 가장 큰 차이점이 바로 들여쓰기다.@

<br>

## 들여쓰기

파이썬 언어는 왼쪽으로 맞추지 않으면 에러가 발생한다.

```python
    print(2)
```

```PowerShell
File "<ipython-input-1-210bc03be51b>", line 4
    print(2)
    ^
IndentationError: unexpected indent
```

<br>

그리고 앞에서 주석에 대해 설명했었다.  
전에 주석에 대해 설명했지만 주석에 대해 더 설명하자면

- 주석을 설명한 페이지 : <a href="https://xininny.github.io/python/function/" target="_blank"> Python | 1. 함수, 내장함수, Print 함수 </a>

파이썬에서 주석은 들여쓰기를 지키지 않아도 된다.
하지만 파이썬에서 **""" ....... """** 문장은 **주석이 아니다.**  
여러줄에 걸친 주석은 큰 따옴표나 작은 따옴표 3개로 감싸는 형식을 쓸 수 있다고 한다.  
하지만 명확하게 말하는 이것은 주석이 아니다.  
**실제로 파이썬의 주석은 #뿐이다.**

```python
"""
여기도 주석
일까요?
"""
```

```PowerShell
\n여기도 주석\n일까요?\n
```

<br>

큰 따옴표와 작은 따옴표로 이루어진 문장은 **문자열 상수(문자열 리터럴)를** 정의하는 문장이다.  
상수를 정의하고 이를 변수에 대입하기 않기에 사용하지 않는다는 의미가 된다.  
즉, 따옴표 3개로 묶은 것은 문자열이고 들여쓰기를 하면 안된다.

```python
"""
여기서부터
여러줄 주석인 셈입니다.
여기까지
"""

'''
여기서부터
여러줄 주석인 셈입니다.
여기까지
'''
comment = """ 이 문장에서는 에러가 발생하지 않습니다"""
print(comment)
```

```PowerShell
이 문장에서는 에러가 발생하지 않습니다
```

<br>

하지만 아래 문장에서는 에러가 발생한다.  
즉, """ """은 실제로는 주석이 아니다.

```python
    """ 이 문장에서는 에러가 발생합니다"""
print(comment)
```

```PowerShell
  File "<ipython-input-5-aceabea9dbfc>", line 3
    """ 이 문장에서는 에러가 발생합니다"""
    ^
IndentationError: unexpected indent
```
