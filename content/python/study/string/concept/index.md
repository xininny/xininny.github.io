---
emoji: 𝐏
title: Python | 11. 문자열
date: '2024-02-24 00:00:00'
author: xininny
tags: Python String 문자열
categories: Python
---

문자열은 하나 이상 연속된 문자(character)들의 나열이다.@

<br>

## 1. 문자열 생성

**큰 따옴표** 또는 **작은 따옴표**로 문자열를 사용할 수 있다.  
큰 따옴표 내부의 작은 따옴표(또는 작은 따옴표 내부의 큰 따옴표)는 일반 문자로 고려된다.  
큰 따옴표 또는 작은 따옴표 3개로 2줄 이상의 긴 문자열을 사용할 수 있다.

```python
a = "Hello Python"
b = 'Python is good.'

print(a)
print(b)
print(type(a))
print(type(b))

a = """This is a long string which is 3 lines...
this is the second line.
this is the third line."""

print(a)
```

```powershell
Hello Python
Python is good.
<class 'str'>
<class 'str'>
This is a long string which is 3 lines...
this is the second line.
this is the third line.
```

<br>

**str( ) 함수**를 이용해서 숫자를 문자로 변환할 수 있다(명시적 형 변환).

```python
a = str(3.14)
print(a)
print(type(a))
```

```powershell
3.14
<class 'str'>
```

<br>

## 2. 문자열 포맷팅

### 1) formatting letter 사용

**문자열을 출력하는 형식을 지정(formatting)하는 기능**을 보자.

문자열 포맷팅을 쓰는 이유

```python
# "오늘은 2021년 9월 10일 월요일입니다" 출력
year = 2021
month = 9
day = 10
day_of_week = "월"

# 문자열 포맷팅을 사용하지 않을 경우
print("오늘은 " + str(year) + "년 " + str(month) + "월 " + str(day) + "일 " + day_of_week + "요일입니다.")

# 문자열 포맷팅을 사용할 경우
print("오늘은 %d년 %d월 %d일 %s요일입니다." % (year, month, day, day_of_week)) #정수는 %d, 문자는 %s로 체워넣는다
print("오늘은 %d년 %d월 %d일 %s요일입니다." % (year, month, day + 1, "화")) #%d = decimal integer, %s = string
```

```powershell
오늘은 2021년 9월 10일 월요일입니다.
오늘은 2021년 9월 10일 월요일입니다.
오늘은 2021년 9월 11일 화요일입니다.
```

<br>

**%d, %s**와 같은 포맷 문자 위치에 % 뒤의 값이 삽입된다.  
포매팅된 결과물이 바로 **문자열**이다.  
2개 이상의 값을 넣고 싶으면 괄호 안에 콤마(,)로 구분해서 적어주면 된다.

```python
print("Hello Python %d" % 3)
print("Hello Python %s" % "version 3")
print("Hello Python %d, my name is %s" % (3, 'xininny'))
```

```powershell
Hello Python 3
Hello Python version 3
Hello Python 3, my name is xininny
```

<br>

### 2) 문자열의 format( ) 메쏘드 사용

메쏘드는 클래스 개념과 관련있다.  
문자열의 format( ) 메쏘드를 사용할 수도 있다.  
**{ }안의 숫자로 위치를 설정한다.**

```python
print("Hello Python {}".format(3))
print("Hello Python {0}".format("version 3"))
print("Hello Python {0}. and {1}".format("version 3", "xininny"))
```

```powershell
Hello Python 3
Hello Python version 3
Hello Python version 3. and xininny
```

<br>

### 3) f-string 포맷팅

파이썬 3.6버전부터 사용할 수 있는 기능이다.  
**문자열을 아주 직관적으로 만들 수 있는 방법**이다.

```python
s_code = '20201234'
s_name = 'Tom'
print(f"저의 이름은 {s_name}이며, 학번은 {s_code}입니다")
```

```powershell
저의 이름은 Tom이며, 학번은 20201234입니다
```

<br>

## 3. 문자열 포맷팅 방식 비교

```python
s_code = '20201234'
s_name = 'Tom'

# 포맷 문자로 구현
print("저의 이름은 %s이며, 학번은 %s입니다" % (s_name, s_code))

# format() 메쏘드로 구현
print("저의 이름은 {}이며, 학번은 {}입니다".format(s_name, s_code))

# f-string으로 구현
print(f"저의 이름은 {s_name}이며, 학번은 {s_code}입니다")
```

```powershell
저의 이름은 Tom이며, 학번은 20201234입니다
저의 이름은 Tom이며, 학번은 20201234입니다
저의 이름은 Tom이며, 학번은 20201234입니다
```

```toc

```
