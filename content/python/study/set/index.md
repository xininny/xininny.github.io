---
emoji: 𝐏
title: Python | 10. Set 자료형
date: '2024-02-23 00:00:00'
author: xininny
tags: Python Set 자료형
categories: Python
---

집합(set)은 집합에 관련된 것을 쉽게 처리하기 위해 만든 자료형이다.@

## 1. Python에서 집합 만들기

파이썬에서 집합은 **set 키워드**를 사용해 만든다.  
집합은 고유한 요소의 정렬되지 않은 모음이다.  
목록이나 문자열을 set 키워드에 전달해 집합을 만들 수 있다.  
set( )을 사용해 빈 집합을 만들 수 있다.

```python
s1 = set([1, 2, 3])
print(s1)

s2 = set("Hello")
print(s2)
```

```powershell
{1, 2, 3}
{'o', 'e', 'H', 'l'}
```

<br>

## 2. 세트의 특징

세트에는 두 가지 주요 기능이 있다.  
**중복 값을 허용하지 않는 것**과 **순서가 지정되는 않는 것**이다.  
따라서 컬렉션에서 중복 항목을 제거하는 데 유용하며 순서가 지정되지 않았기에 **인덱싱을 지원하지 않는다.**  
집합의 요소에 액세스하려면 먼저 집합을 목록이나 튜플로 변환해야 한다.

```python
s1 = set([1, 2, 3])
l1 = list(s1)
print(l1[0])

t1 = tuple(s1)
print(t1[0])
```

```powershell
1
1
```

<br>

## 3. 세트 작업

집합은 교집합, 합집합 또는 차이 찾기 같은 작업을 수행하려는 경우에 유용하다.  
두 세트의 **교집합**은 **&연산자** 또는 **intersection( )함수**를 사용해 찾는다.

```python
s1 = set([1, 2, 3, 4, 5, 6])
s2 = set([4, 5, 6, 7, 8, 9])

print(s1 & s2)
print(s1.intersection(s2))
```

```powershell
{4, 5, 6}
{4, 5, 6}
```

<br>

두 집합의 **합집합**은 **|연산자** 또는 **union( ) 함수**를 사용해 찾으며,  
두 집합 간의 **차이**는 **-연산자** 또는 **difference( ) 함수**를 사용해 찾는다.

```python
print(s1 | s2)
print(s1.union(s2))

print(s1 - s2)
print(s1.difference(s2))
```

```powershell
{1, 2, 3, 4, 5, 6, 7, 8, 9}
{1, 2, 3, 4, 5, 6, 7, 8, 9}
{1, 2, 3}
{1, 2, 3}
```

<br>

## 4. 집합과 관련된 기능

**add( ) 함수**를 사용해 집합에 단일 값을 추가하고  
**update( )함수**를 사용해 여러 값을 추가할 수 있다.

```python
s1 = set([1, 2, 3])
s1.add(4)
print(s1)

s1.update([5, 6])
print(s1)

# remove() 함수를 사용하여 세트에서 값을 제거할 수 있다.

s1.remove(2)
print(s1)
```

```powershell
{1, 2, 3, 4}
{1, 2, 3, 4, 5, 6}
{1, 3, 4, 5, 6}
```
