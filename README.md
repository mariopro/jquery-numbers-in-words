# jQuery-numbers-in-words
Number to words converter 

# Write Numbers in Words
Script to write numbers in full

Short script for writing numbers in words

> **Short scale**
> Every new term greater than one million is one thousand times larger than the previous term.

> Thus, billion means one thousand million 10⁹, trillion means one thousand billion 10¹², and so on.

> Thus, an n-illion equals 10ⁿ ... > For example, a billion is equivalent to one thousand million 10⁹, a trillion is equivalent to one thousand billion 10¹², and so on.

> The **long scale** corresponds to a system of number nomenclature in which each new term greater than one million is 1,000,000 times greater than the previous term.

> For example, one billion is equivalent to one million million 10¹²; one trillion is equivalent to one million billion 10¹⁸, and so on.

*source wikipedia* [wiki/Long_and_short_scales](https://en.wikipedia.org/wiki/Long_and_short_scales)



NUMBERS IN WORDS
Números por Extenso v.3.2
+
- v.1.0  20.01.2026 jQuery version

created by: MarioPro

1. Numbers in words

OPTIONS 
 - short scale    BR US
 - long scale     PT UK

<small><em>For most of the 19th and 20th centuries, the United Kingdom uniformly used the long scale. In contrast, the United States of America used the short scale, so that the two systems were often referred to as “British” and “American,” respectively. In 1974, the government of the UK abandoned the long scale, so that the UK now applies the short scale interpretation exclusively in mass media and official usage.</em></small>

<br/>
  
@string number to convert<br/>
@string scale - default long scale EN

```JavaScript
$('#id').numbersinwords('1575.20','PT');
```
mil, quinhentos e setenta e cinco vírgula vinte
```JavaScript
$('#id').numbersinwords('1575.20','UK');
```
One thousand, five hundred and seventy-five euros and twenty cents.

2. Money in words

OPTIONS 
- short scale    BR US
- long scale     PT UK
- coin           EUR USD

@string number to convert<br/>
@string scale - default long scale PT<br/>
@string coin  - default EUR<br/>

```JavaScript
$('#id').moneyInWords('1575.20','PT','EUR');
```
mil, quinhentos e setenta e cinco euros e vinte cêntimos

```JavaScript
$('#id').moneyInWords('1575,20'.'US','USD');
```
One thousand, five hundred and seventy-five dollars and twenty cents
