# Calculus Spine v0.2

Scope: the minimum general-purpose path from counting through introductory differentiation. Sections A–D are a documented later expansion; initial authoring begins at Section E. This is a planning spine, not a final curriculum.

Format: `order. Title | id: stable-slug | prerequisites: stable-slugs` (`none` means an entry point). Order is editable; IDs are permanent.

## A. Number sense and whole numbers

001. Match objects one-to-one | id: match-objects-one-to-one | prerequisites: none
002. Recognize more, fewer, and equal | id: recognize-more-fewer-and-equal | prerequisites: match-objects-one-to-one
003. Count objects to 5 | id: count-objects-to-5 | prerequisites: match-objects-one-to-one
004. Recognize numerals 0–5 | id: recognize-numerals-0-5 | prerequisites: count-objects-to-5
005. Connect numerals to quantities 0–5 | id: connect-numerals-to-quantities-0-5 | prerequisites: count-objects-to-5, recognize-numerals-0-5
006. Count objects to 10 | id: count-objects-to-10 | prerequisites: connect-numerals-to-quantities-0-5
007. Recognize numerals 6–10 | id: recognize-numerals-6-10 | prerequisites: count-objects-to-10
008. Connect numerals to quantities 6–10 | id: connect-numerals-to-quantities-6-10 | prerequisites: count-objects-to-10, recognize-numerals-6-10
009. Understand zero | id: understand-zero | prerequisites: recognize-numerals-0-5, connect-numerals-to-quantities-0-5
010. Order whole numbers to 10 | id: order-whole-numbers-to-10 | prerequisites: recognize-more-fewer-and-equal, connect-numerals-to-quantities-6-10, understand-zero
011. Compose numbers to 10 | id: compose-numbers-to-10 | prerequisites: connect-numerals-to-quantities-6-10
012. Decompose numbers to 10 | id: decompose-numbers-to-10 | prerequisites: compose-numbers-to-10
013. Interpret addition as joining | id: interpret-addition-as-joining | prerequisites: compose-numbers-to-10
014. Interpret subtraction as separating | id: interpret-subtraction-as-separating | prerequisites: decompose-numbers-to-10
015. Add within 5 | id: add-within-5 | prerequisites: interpret-addition-as-joining
016. Subtract within 5 | id: subtract-within-5 | prerequisites: interpret-subtraction-as-separating, add-within-5
017. Add within 10 | id: add-within-10 | prerequisites: compose-numbers-to-10, add-within-5
018. Subtract within 10 | id: subtract-within-10 | prerequisites: decompose-numbers-to-10, subtract-within-5, add-within-10
019. Compare numbers with symbols | id: compare-numbers-with-symbols | prerequisites: order-whole-numbers-to-10
020. Locate whole numbers on a number line | id: locate-whole-numbers-on-a-number-line | prerequisites: order-whole-numbers-to-10
021. Count forward from any number to 20 | id: count-forward-from-any-number-to-20 | prerequisites: connect-numerals-to-quantities-6-10
022. Recognize numerals to 20 | id: recognize-numerals-to-20 | prerequisites: count-forward-from-any-number-to-20
023. Represent teen numbers as ten and ones | id: represent-teen-numbers-as-ten-and-ones | prerequisites: compose-numbers-to-10, recognize-numerals-to-20
024. Add within 20 by making ten | id: add-within-20-by-making-ten | prerequisites: add-within-10, represent-teen-numbers-as-ten-and-ones
025. Subtract within 20 by using ten | id: subtract-within-20-by-using-ten | prerequisites: subtract-within-10, represent-teen-numbers-as-ten-and-ones, add-within-20-by-making-ten
026. Understand tens and ones | id: understand-tens-and-ones | prerequisites: represent-teen-numbers-as-ten-and-ones
027. Read and write two-digit numbers | id: read-and-write-two-digit-numbers | prerequisites: recognize-numerals-to-20, understand-tens-and-ones
028. Compare two-digit numbers | id: compare-two-digit-numbers | prerequisites: compare-numbers-with-symbols, understand-tens-and-ones, read-and-write-two-digit-numbers
029. Add multiples of ten | id: add-multiples-of-ten | prerequisites: add-within-10, understand-tens-and-ones
030. Add two-digit numbers without regrouping | id: add-two-digit-numbers-without-regrouping | prerequisites: add-within-10, understand-tens-and-ones, add-multiples-of-ten
031. Subtract two-digit numbers without regrouping | id: subtract-two-digit-numbers-without-regrouping | prerequisites: subtract-within-10, understand-tens-and-ones, add-multiples-of-ten
032. Regroup ten ones as one ten | id: regroup-ten-ones-as-one-ten | prerequisites: understand-tens-and-ones
033. Add two-digit numbers with regrouping | id: add-two-digit-numbers-with-regrouping | prerequisites: add-within-20-by-making-ten, add-two-digit-numbers-without-regrouping, regroup-ten-ones-as-one-ten
034. Subtract two-digit numbers with regrouping | id: subtract-two-digit-numbers-with-regrouping | prerequisites: subtract-within-20-by-using-ten, subtract-two-digit-numbers-without-regrouping, regroup-ten-ones-as-one-ten
035. Understand hundreds | id: understand-hundreds | prerequisites: understand-tens-and-ones, regroup-ten-ones-as-one-ten
036. Read and write three-digit numbers | id: read-and-write-three-digit-numbers | prerequisites: read-and-write-two-digit-numbers, understand-hundreds
037. Compare three-digit numbers | id: compare-three-digit-numbers | prerequisites: compare-two-digit-numbers, understand-hundreds, read-and-write-three-digit-numbers
038. Add three-digit numbers | id: add-three-digit-numbers | prerequisites: add-two-digit-numbers-with-regrouping, understand-hundreds
039. Subtract three-digit numbers | id: subtract-three-digit-numbers | prerequisites: subtract-two-digit-numbers-with-regrouping, understand-hundreds

## B. Multiplication, division, and whole-number fluency

040. Interpret multiplication as equal groups | id: interpret-multiplication-as-equal-groups | prerequisites: add-within-10
041. Interpret multiplication as arrays | id: interpret-multiplication-as-arrays | prerequisites: interpret-multiplication-as-equal-groups
042. Connect repeated addition to multiplication | id: connect-repeated-addition-to-multiplication | prerequisites: interpret-multiplication-as-equal-groups, interpret-multiplication-as-arrays
043. Understand the commutative property of multiplication | id: understand-the-commutative-property-of-multiplication | prerequisites: interpret-multiplication-as-arrays, connect-repeated-addition-to-multiplication
044. Multiply by 0, 1, 2, 5, and 10 | id: multiply-by-0-1-2-5-and-10 | prerequisites: connect-repeated-addition-to-multiplication, understand-the-commutative-property-of-multiplication
045. Multiply by 3 and 4 | id: multiply-by-3-and-4 | prerequisites: multiply-by-0-1-2-5-and-10
046. Multiply by 6 and 7 | id: multiply-by-6-and-7 | prerequisites: multiply-by-0-1-2-5-and-10, multiply-by-3-and-4
047. Multiply by 8 and 9 | id: multiply-by-8-and-9 | prerequisites: multiply-by-0-1-2-5-and-10, multiply-by-6-and-7
048. Recall single-digit multiplication facts | id: recall-single-digit-multiplication-facts | prerequisites: multiply-by-0-1-2-5-and-10, multiply-by-3-and-4, multiply-by-6-and-7, multiply-by-8-and-9
049. Interpret division as sharing | id: interpret-division-as-sharing | prerequisites: interpret-multiplication-as-equal-groups
050. Interpret division as grouping | id: interpret-division-as-grouping | prerequisites: interpret-multiplication-as-equal-groups, interpret-division-as-sharing
051. Connect multiplication and division facts | id: connect-multiplication-and-division-facts | prerequisites: recall-single-digit-multiplication-facts, interpret-division-as-sharing, interpret-division-as-grouping
052. Divide within multiplication facts | id: divide-within-multiplication-facts | prerequisites: recall-single-digit-multiplication-facts, connect-multiplication-and-division-facts
053. Understand factors and products | id: understand-factors-and-products | prerequisites: recall-single-digit-multiplication-facts
054. Understand quotients, dividends, and divisors | id: understand-quotients-dividends-and-divisors | prerequisites: divide-within-multiplication-facts
055. Apply multiplication properties | id: apply-multiplication-properties | prerequisites: understand-the-commutative-property-of-multiplication, recall-single-digit-multiplication-facts, understand-factors-and-products
056. Use the distributive property with whole numbers | id: use-the-distributive-property-with-whole-numbers | prerequisites: add-three-digit-numbers, connect-repeated-addition-to-multiplication, apply-multiplication-properties
057. Multiply a one-digit number by a multi-digit number | id: multiply-a-one-digit-number-by-a-multi-digit-number | prerequisites: add-three-digit-numbers, recall-single-digit-multiplication-facts, use-the-distributive-property-with-whole-numbers
058. Multiply two-digit numbers | id: multiply-two-digit-numbers | prerequisites: recall-single-digit-multiplication-facts, use-the-distributive-property-with-whole-numbers, multiply-a-one-digit-number-by-a-multi-digit-number
059. Divide multi-digit numbers by one digit | id: divide-multi-digit-numbers-by-one-digit | prerequisites: divide-within-multiplication-facts, multiply-a-one-digit-number-by-a-multi-digit-number
060. Interpret remainders | id: interpret-remainders | prerequisites: interpret-division-as-grouping, understand-quotients-dividends-and-divisors, divide-multi-digit-numbers-by-one-digit
061. Divide multi-digit numbers by two digits | id: divide-multi-digit-numbers-by-two-digits | prerequisites: multiply-two-digit-numbers, divide-multi-digit-numbers-by-one-digit, interpret-remainders
062. Identify multiples | id: identify-multiples | prerequisites: recall-single-digit-multiplication-facts, understand-factors-and-products
063. Identify factor pairs | id: identify-factor-pairs | prerequisites: understand-factors-and-products, identify-multiples
064. Distinguish prime and composite numbers | id: distinguish-prime-and-composite-numbers | prerequisites: identify-factor-pairs
065. Find prime factorizations | id: find-prime-factorizations | prerequisites: identify-factor-pairs, distinguish-prime-and-composite-numbers
066. Find greatest common factors | id: find-greatest-common-factors | prerequisites: identify-factor-pairs, find-prime-factorizations
067. Find least common multiples | id: find-least-common-multiples | prerequisites: identify-multiples, find-prime-factorizations
068. Use order of operations with whole numbers | id: use-order-of-operations-with-whole-numbers | prerequisites: add-three-digit-numbers, multiply-two-digit-numbers, divide-multi-digit-numbers-by-two-digits
069. Estimate whole-number calculations | id: estimate-whole-number-calculations | prerequisites: compare-three-digit-numbers, add-three-digit-numbers, subtract-three-digit-numbers, multiply-two-digit-numbers
070. Solve one-step whole-number word problems | id: solve-one-step-whole-number-word-problems | prerequisites: add-three-digit-numbers, subtract-three-digit-numbers, multiply-two-digit-numbers, divide-multi-digit-numbers-by-two-digits
071. Check answers with inverse operations | id: check-answers-with-inverse-operations | prerequisites: add-three-digit-numbers, subtract-three-digit-numbers, connect-multiplication-and-division-facts

## C. Fractions

072. Recognize equal parts of a whole | id: recognize-equal-parts-of-a-whole | prerequisites: recognize-more-fewer-and-equal, interpret-multiplication-as-equal-groups
073. Understand unit fractions | id: understand-unit-fractions | prerequisites: recognize-equal-parts-of-a-whole
074. Read and write fractions | id: read-and-write-fractions | prerequisites: recognize-equal-parts-of-a-whole, understand-unit-fractions
075. Model fractions of shapes | id: model-fractions-of-shapes | prerequisites: read-and-write-fractions
076. Model fractions on number lines | id: model-fractions-on-number-lines | prerequisites: locate-whole-numbers-on-a-number-line, read-and-write-fractions
077. Understand numerator and denominator | id: understand-numerator-and-denominator | prerequisites: read-and-write-fractions, model-fractions-of-shapes
078. Compare unit fractions | id: compare-unit-fractions | prerequisites: understand-unit-fractions, model-fractions-on-number-lines
079. Compare fractions with equal denominators | id: compare-fractions-with-equal-denominators | prerequisites: compare-numbers-with-symbols, understand-numerator-and-denominator
080. Generate equivalent fractions visually | id: generate-equivalent-fractions-visually | prerequisites: model-fractions-of-shapes, understand-numerator-and-denominator
081. Generate equivalent fractions numerically | id: generate-equivalent-fractions-numerically | prerequisites: recall-single-digit-multiplication-facts, understand-numerator-and-denominator, generate-equivalent-fractions-visually
082. Simplify fractions using common factors | id: simplify-fractions-using-common-factors | prerequisites: find-greatest-common-factors, generate-equivalent-fractions-numerically
083. Compare fractions with unlike denominators | id: compare-fractions-with-unlike-denominators | prerequisites: find-least-common-multiples, compare-fractions-with-equal-denominators, generate-equivalent-fractions-numerically
084. Add fractions with equal denominators | id: add-fractions-with-equal-denominators | prerequisites: add-within-10, understand-numerator-and-denominator
085. Subtract fractions with equal denominators | id: subtract-fractions-with-equal-denominators | prerequisites: subtract-within-10, understand-numerator-and-denominator, add-fractions-with-equal-denominators
086. Add fractions with unlike denominators | id: add-fractions-with-unlike-denominators | prerequisites: find-least-common-multiples, generate-equivalent-fractions-numerically, add-fractions-with-equal-denominators
087. Subtract fractions with unlike denominators | id: subtract-fractions-with-unlike-denominators | prerequisites: find-least-common-multiples, generate-equivalent-fractions-numerically, subtract-fractions-with-equal-denominators
088. Understand improper fractions | id: understand-improper-fractions | prerequisites: model-fractions-on-number-lines, understand-numerator-and-denominator
089. Understand mixed numbers | id: understand-mixed-numbers | prerequisites: understand-improper-fractions
090. Convert between mixed and improper forms | id: convert-between-mixed-and-improper-forms | prerequisites: recall-single-digit-multiplication-facts, divide-within-multiplication-facts, understand-improper-fractions, understand-mixed-numbers
091. Interpret a fraction as division | id: interpret-a-fraction-as-division | prerequisites: understand-quotients-dividends-and-divisors, read-and-write-fractions
092. Multiply a fraction by a whole number | id: multiply-a-fraction-by-a-whole-number | prerequisites: connect-repeated-addition-to-multiplication, understand-numerator-and-denominator, generate-equivalent-fractions-numerically
093. Multiply two fractions | id: multiply-two-fractions | prerequisites: recall-single-digit-multiplication-facts, understand-numerator-and-denominator, interpret-a-fraction-as-division, multiply-a-fraction-by-a-whole-number
094. Understand reciprocals | id: understand-reciprocals | prerequisites: interpret-a-fraction-as-division, multiply-two-fractions
095. Divide fractions | id: divide-fractions | prerequisites: connect-multiplication-and-division-facts, multiply-two-fractions, understand-reciprocals
096. Evaluate expressions with fractions | id: evaluate-expressions-with-fractions | prerequisites: use-order-of-operations-with-whole-numbers, simplify-fractions-using-common-factors, add-fractions-with-unlike-denominators, subtract-fractions-with-unlike-denominators, multiply-two-fractions, divide-fractions
097. Estimate fraction calculations | id: estimate-fraction-calculations | prerequisites: estimate-whole-number-calculations, model-fractions-on-number-lines, compare-fractions-with-unlike-denominators
098. Understand ratios as multiplicative comparisons | id: understand-ratios-as-multiplicative-comparisons | prerequisites: interpret-multiplication-as-equal-groups, read-and-write-fractions

## D. Decimals, ratios, rates, and percent

099. Understand tenths and hundredths | id: understand-tenths-and-hundredths | prerequisites: understand-tens-and-ones, read-and-write-fractions
100. Read and write decimals | id: read-and-write-decimals | prerequisites: understand-tenths-and-hundredths
101. Locate decimals on number lines | id: locate-decimals-on-number-lines | prerequisites: locate-whole-numbers-on-a-number-line, read-and-write-decimals
102. Compare and order decimals | id: compare-and-order-decimals | prerequisites: compare-numbers-with-symbols, read-and-write-decimals, locate-decimals-on-number-lines
103. Convert fractions with denominators 10 and 100 to decimals | id: convert-fractions-with-denominators-10-and-100-to-decimals | prerequisites: generate-equivalent-fractions-numerically, understand-tenths-and-hundredths, read-and-write-decimals
104. Convert common fractions to terminating decimals | id: convert-common-fractions-to-terminating-decimals | prerequisites: divide-multi-digit-numbers-by-two-digits, interpret-a-fraction-as-division, read-and-write-decimals
105. Add decimals | id: add-decimals | prerequisites: add-two-digit-numbers-with-regrouping, understand-tenths-and-hundredths, read-and-write-decimals
106. Subtract decimals | id: subtract-decimals | prerequisites: subtract-two-digit-numbers-with-regrouping, understand-tenths-and-hundredths, read-and-write-decimals, add-decimals
107. Multiply decimals | id: multiply-decimals | prerequisites: multiply-two-digit-numbers, understand-tenths-and-hundredths, read-and-write-decimals
108. Divide decimals | id: divide-decimals | prerequisites: divide-multi-digit-numbers-by-two-digits, understand-tenths-and-hundredths, read-and-write-decimals, multiply-decimals
109. Evaluate expressions with decimals | id: evaluate-expressions-with-decimals | prerequisites: use-order-of-operations-with-whole-numbers, add-decimals, subtract-decimals, multiply-decimals, divide-decimals
110. Express and simplify ratios | id: express-and-simplify-ratios | prerequisites: simplify-fractions-using-common-factors, understand-ratios-as-multiplicative-comparisons
111. Identify equivalent ratios | id: identify-equivalent-ratios | prerequisites: generate-equivalent-fractions-numerically, understand-ratios-as-multiplicative-comparisons, express-and-simplify-ratios
112. Understand rates and unit rates | id: understand-rates-and-unit-rates | prerequisites: interpret-a-fraction-as-division, understand-ratios-as-multiplicative-comparisons, divide-decimals
113. Build ratio tables | id: build-ratio-tables | prerequisites: identify-equivalent-ratios, understand-rates-and-unit-rates
114. Solve proportions by scaling | id: solve-proportions-by-scaling | prerequisites: identify-equivalent-ratios, build-ratio-tables
115. Solve proportions with cross products | id: solve-proportions-with-cross-products | prerequisites: multiply-two-fractions, solve-proportions-by-scaling
116. Understand percent as per hundred | id: understand-percent-as-per-hundred | prerequisites: understand-tenths-and-hundredths, convert-fractions-with-denominators-10-and-100-to-decimals, express-and-simplify-ratios
117. Convert among fractions, decimals, and percents | id: convert-among-fractions-decimals-and-percents | prerequisites: simplify-fractions-using-common-factors, convert-common-fractions-to-terminating-decimals, understand-percent-as-per-hundred
118. Find a percent of a quantity | id: find-a-percent-of-a-quantity | prerequisites: multiply-a-fraction-by-a-whole-number, multiply-decimals, understand-percent-as-per-hundred, convert-among-fractions-decimals-and-percents
119. Find the whole from a percent and part | id: find-the-whole-from-a-percent-and-part | prerequisites: divide-fractions, divide-decimals, understand-percent-as-per-hundred, find-a-percent-of-a-quantity
120. Find percent change | id: find-percent-change | prerequisites: understand-rates-and-unit-rates, understand-percent-as-per-hundred, find-a-percent-of-a-quantity
121. Solve ratio, rate, and percent problems | id: solve-ratio-rate-and-percent-problems | prerequisites: understand-rates-and-unit-rates, solve-proportions-with-cross-products, find-a-percent-of-a-quantity, find-the-whole-from-a-percent-and-part, find-percent-change
122. Distinguish proportional and nonproportional relationships | id: distinguish-proportional-and-nonproportional-relationships | prerequisites: build-ratio-tables, solve-proportions-with-cross-products

## E. Signed numbers, powers, and numerical expressions

123. Interpret negative numbers | id: interpret-negative-numbers | prerequisites: understand-zero, locate-whole-numbers-on-a-number-line
124. Locate signed numbers on a number line | id: locate-signed-numbers-on-a-number-line | prerequisites: locate-whole-numbers-on-a-number-line, interpret-negative-numbers
125. Compare and order signed numbers | id: compare-and-order-signed-numbers | prerequisites: compare-numbers-with-symbols, locate-signed-numbers-on-a-number-line
126. Understand absolute value as distance | id: understand-absolute-value-as-distance | prerequisites: locate-signed-numbers-on-a-number-line
127. Add integers using movement | id: add-integers-using-movement | prerequisites: subtract-within-10, locate-signed-numbers-on-a-number-line
128. Add integers using sign rules | id: add-integers-using-sign-rules | prerequisites: compare-and-order-signed-numbers, add-integers-using-movement
129. Subtract integers | id: subtract-integers | prerequisites: add-integers-using-movement, add-integers-using-sign-rules
130. Multiply signed numbers | id: multiply-signed-numbers | prerequisites: recall-single-digit-multiplication-facts, interpret-negative-numbers, add-integers-using-sign-rules
131. Divide signed numbers | id: divide-signed-numbers | prerequisites: divide-within-multiplication-facts, interpret-negative-numbers, multiply-signed-numbers
132. Perform operations with signed decimals | id: perform-operations-with-signed-decimals | prerequisites: add-decimals, subtract-decimals, multiply-decimals, divide-decimals, add-integers-using-sign-rules, multiply-signed-numbers, divide-signed-numbers
133. Perform operations with signed fractions | id: perform-operations-with-signed-fractions | prerequisites: add-fractions-with-unlike-denominators, subtract-fractions-with-unlike-denominators, multiply-two-fractions, divide-fractions, add-integers-using-sign-rules, multiply-signed-numbers, divide-signed-numbers
134. Understand whole-number exponents | id: understand-whole-number-exponents | prerequisites: connect-repeated-addition-to-multiplication, recall-single-digit-multiplication-facts
135. Evaluate powers | id: evaluate-powers | prerequisites: recall-single-digit-multiplication-facts, understand-whole-number-exponents
136. Understand squares and square roots | id: understand-squares-and-square-roots | prerequisites: recall-single-digit-multiplication-facts, understand-whole-number-exponents, evaluate-powers
137. Estimate irrational square roots | id: estimate-irrational-square-roots | prerequisites: compare-and-order-decimals, understand-squares-and-square-roots
138. Understand cubes and cube roots | id: understand-cubes-and-cube-roots | prerequisites: understand-whole-number-exponents, evaluate-powers
139. Use exponent product and quotient rules | id: use-exponent-product-and-quotient-rules | prerequisites: understand-whole-number-exponents, evaluate-powers
140. Use the power-of-a-power rule | id: use-the-power-of-a-power-rule | prerequisites: understand-whole-number-exponents, use-exponent-product-and-quotient-rules
141. Understand zero exponents | id: understand-zero-exponents | prerequisites: use-exponent-product-and-quotient-rules
142. Understand negative integer exponents | id: understand-negative-integer-exponents | prerequisites: understand-reciprocals, use-exponent-product-and-quotient-rules, understand-zero-exponents
143. Evaluate numerical expressions with signed numbers | id: evaluate-numerical-expressions-with-signed-numbers | prerequisites: use-order-of-operations-with-whole-numbers, add-integers-using-sign-rules, subtract-integers, multiply-signed-numbers, divide-signed-numbers
144. Write numbers in scientific notation | id: write-numbers-in-scientific-notation | prerequisites: read-and-write-decimals, understand-whole-number-exponents
145. Classify natural, whole, integer, rational, and irrational numbers | id: classify-natural-whole-integer-rational-and-irrational-numbers | prerequisites: interpret-a-fraction-as-division, interpret-negative-numbers, estimate-irrational-square-roots

## F. Algebraic language and expressions

146. Understand variables and constants | id: understand-variables-and-constants | prerequisites: use-order-of-operations-with-whole-numbers
147. Translate words into algebraic expressions | id: translate-words-into-algebraic-expressions | prerequisites: solve-one-step-whole-number-word-problems, understand-variables-and-constants
148. Evaluate one-variable expressions | id: evaluate-one-variable-expressions | prerequisites: evaluate-numerical-expressions-with-signed-numbers, understand-variables-and-constants
149. Evaluate multivariable expressions | id: evaluate-multivariable-expressions | prerequisites: evaluate-one-variable-expressions
150. Identify terms, coefficients, and factors | id: identify-terms-coefficients-and-factors | prerequisites: understand-factors-and-products, understand-variables-and-constants
151. Recognize like terms | id: recognize-like-terms | prerequisites: identify-terms-coefficients-and-factors
152. Combine like terms | id: combine-like-terms | prerequisites: add-three-digit-numbers, add-integers-using-sign-rules, identify-terms-coefficients-and-factors, recognize-like-terms
153. Apply the distributive property algebraically | id: apply-the-distributive-property-algebraically | prerequisites: use-the-distributive-property-with-whole-numbers, understand-variables-and-constants, identify-terms-coefficients-and-factors
154. Distribute signed factors | id: distribute-signed-factors | prerequisites: multiply-signed-numbers, apply-the-distributive-property-algebraically
155. Simplify linear expressions | id: simplify-linear-expressions | prerequisites: combine-like-terms, apply-the-distributive-property-algebraically, distribute-signed-factors
156. Simplify expressions with fractions | id: simplify-expressions-with-fractions | prerequisites: evaluate-expressions-with-fractions, perform-operations-with-signed-fractions, apply-the-distributive-property-algebraically, simplify-linear-expressions
157. Simplify expressions with exponents | id: simplify-expressions-with-exponents | prerequisites: use-exponent-product-and-quotient-rules, use-the-power-of-a-power-rule, understand-negative-integer-exponents, identify-terms-coefficients-and-factors
158. Distinguish expressions, equations, and inequalities | id: distinguish-expressions-equations-and-inequalities | prerequisites: compare-numbers-with-symbols, understand-variables-and-constants
159. Understand equivalent expressions | id: understand-equivalent-expressions | prerequisites: simplify-linear-expressions
160. Use formulas by substitution | id: use-formulas-by-substitution | prerequisites: evaluate-multivariable-expressions
161. Rearrange simple formulas | id: rearrange-simple-formulas | prerequisites: simplify-linear-expressions, use-formulas-by-substitution
162. Model quantities with algebraic expressions | id: model-quantities-with-algebraic-expressions | prerequisites: solve-ratio-rate-and-percent-problems, translate-words-into-algebraic-expressions, use-formulas-by-substitution

## G. Equations and inequalities

163. Understand equality as balance | id: understand-equality-as-balance | prerequisites: check-answers-with-inverse-operations, distinguish-expressions-equations-and-inequalities
164. Test whether a value solves an equation | id: test-whether-a-value-solves-an-equation | prerequisites: evaluate-one-variable-expressions, understand-equality-as-balance
165. Solve addition equations | id: solve-addition-equations | prerequisites: subtract-integers, understand-equality-as-balance, test-whether-a-value-solves-an-equation
166. Solve subtraction equations | id: solve-subtraction-equations | prerequisites: subtract-integers, understand-equality-as-balance, solve-addition-equations
167. Solve multiplication equations | id: solve-multiplication-equations | prerequisites: divide-signed-numbers, understand-equality-as-balance, test-whether-a-value-solves-an-equation
168. Solve division equations | id: solve-division-equations | prerequisites: multiply-signed-numbers, understand-equality-as-balance, solve-multiplication-equations
169. Solve one-step equations with fractions and decimals | id: solve-one-step-equations-with-fractions-and-decimals | prerequisites: perform-operations-with-signed-decimals, perform-operations-with-signed-fractions, solve-addition-equations, solve-subtraction-equations, solve-multiplication-equations, solve-division-equations
170. Solve two-step linear equations | id: solve-two-step-linear-equations | prerequisites: simplify-linear-expressions, solve-addition-equations, solve-multiplication-equations
171. Solve multi-step linear equations | id: solve-multi-step-linear-equations | prerequisites: simplify-linear-expressions, solve-one-step-equations-with-fractions-and-decimals, solve-two-step-linear-equations
172. Solve equations with variables on both sides | id: solve-equations-with-variables-on-both-sides | prerequisites: combine-like-terms, distribute-signed-factors, solve-multi-step-linear-equations
173. Identify no-solution and identity equations | id: identify-no-solution-and-identity-equations | prerequisites: understand-equivalent-expressions, solve-equations-with-variables-on-both-sides
174. Solve equations containing fractions | id: solve-equations-containing-fractions | prerequisites: simplify-expressions-with-fractions, solve-one-step-equations-with-fractions-and-decimals, solve-multi-step-linear-equations
175. Solve literal equations for a variable | id: solve-literal-equations-for-a-variable | prerequisites: rearrange-simple-formulas, solve-multi-step-linear-equations
176. Model and solve linear word problems | id: model-and-solve-linear-word-problems | prerequisites: model-quantities-with-algebraic-expressions, solve-two-step-linear-equations, solve-multi-step-linear-equations
177. Understand inequality solution sets | id: understand-inequality-solution-sets | prerequisites: compare-numbers-with-symbols, locate-signed-numbers-on-a-number-line, distinguish-expressions-equations-and-inequalities
178. Graph one-variable inequalities | id: graph-one-variable-inequalities | prerequisites: locate-signed-numbers-on-a-number-line, understand-inequality-solution-sets
179. Solve addition and subtraction inequalities | id: solve-addition-and-subtraction-inequalities | prerequisites: subtract-integers, solve-addition-equations, solve-subtraction-equations, understand-inequality-solution-sets
180. Reverse an inequality when multiplying or dividing by a negative | id: reverse-an-inequality-when-multiplying-or-dividing-by-a-negative | prerequisites: compare-and-order-signed-numbers, multiply-signed-numbers, divide-signed-numbers, understand-inequality-solution-sets
181. Solve multiplication and division inequalities | id: solve-multiplication-and-division-inequalities | prerequisites: solve-multiplication-equations, solve-division-equations, reverse-an-inequality-when-multiplying-or-dividing-by-a-negative
182. Solve multi-step inequalities | id: solve-multi-step-inequalities | prerequisites: simplify-linear-expressions, solve-addition-and-subtraction-inequalities, solve-multiplication-and-division-inequalities
183. Solve compound inequalities with and | id: solve-compound-inequalities-with-and | prerequisites: graph-one-variable-inequalities, solve-multi-step-inequalities
184. Solve compound inequalities with or | id: solve-compound-inequalities-with-or | prerequisites: graph-one-variable-inequalities, solve-multi-step-inequalities
185. Understand interval notation | id: understand-interval-notation | prerequisites: graph-one-variable-inequalities, solve-compound-inequalities-with-and, solve-compound-inequalities-with-or
186. Solve absolute-value equations geometrically | id: solve-absolute-value-equations-geometrically | prerequisites: understand-absolute-value-as-distance, understand-equality-as-balance
187. Solve absolute-value equations algebraically | id: solve-absolute-value-equations-algebraically | prerequisites: solve-multi-step-linear-equations, solve-absolute-value-equations-geometrically
188. Check equations for extraneous solutions | id: check-equations-for-extraneous-solutions | prerequisites: test-whether-a-value-solves-an-equation, solve-multi-step-linear-equations

## H. Coordinates, relations, and linear functions

189. Plot points in the coordinate plane | id: plot-points-in-the-coordinate-plane | prerequisites: locate-signed-numbers-on-a-number-line
190. Read coordinates from graphs | id: read-coordinates-from-graphs | prerequisites: plot-points-in-the-coordinate-plane
191. Understand relations and ordered pairs | id: understand-relations-and-ordered-pairs | prerequisites: evaluate-multivariable-expressions, plot-points-in-the-coordinate-plane
192. Determine whether a relation is a function | id: determine-whether-a-relation-is-a-function | prerequisites: understand-relations-and-ordered-pairs
193. Use function notation | id: use-function-notation | prerequisites: evaluate-one-variable-expressions, determine-whether-a-relation-is-a-function
194. Evaluate functions from formulas | id: evaluate-functions-from-formulas | prerequisites: evaluate-one-variable-expressions, use-function-notation
195. Evaluate functions from tables and graphs | id: evaluate-functions-from-tables-and-graphs | prerequisites: read-coordinates-from-graphs, use-function-notation
196. Identify domain and range from finite relations | id: identify-domain-and-range-from-finite-relations | prerequisites: understand-interval-notation, understand-relations-and-ordered-pairs, determine-whether-a-relation-is-a-function
197. Identify independent and dependent variables | id: identify-independent-and-dependent-variables | prerequisites: model-quantities-with-algebraic-expressions, determine-whether-a-relation-is-a-function
198. Graph proportional relationships | id: graph-proportional-relationships | prerequisites: build-ratio-tables, distinguish-proportional-and-nonproportional-relationships, plot-points-in-the-coordinate-plane
199. Understand slope as a rate of change | id: understand-slope-as-a-rate-of-change | prerequisites: understand-rates-and-unit-rates, read-coordinates-from-graphs, graph-proportional-relationships
200. Calculate slope from two points | id: calculate-slope-from-two-points | prerequisites: subtract-integers, perform-operations-with-signed-fractions, plot-points-in-the-coordinate-plane, understand-slope-as-a-rate-of-change
201. Interpret positive, negative, zero, and undefined slope | id: interpret-positive-negative-zero-and-undefined-slope | prerequisites: compare-and-order-signed-numbers, calculate-slope-from-two-points
202. Graph lines from slope and intercept | id: graph-lines-from-slope-and-intercept | prerequisites: plot-points-in-the-coordinate-plane, understand-slope-as-a-rate-of-change, calculate-slope-from-two-points
203. Write equations in slope-intercept form | id: write-equations-in-slope-intercept-form | prerequisites: combine-like-terms, use-formulas-by-substitution, graph-lines-from-slope-and-intercept
204. Write a line equation from two points | id: write-a-line-equation-from-two-points | prerequisites: calculate-slope-from-two-points, write-equations-in-slope-intercept-form
205. Write point-slope equations | id: write-point-slope-equations | prerequisites: calculate-slope-from-two-points, write-equations-in-slope-intercept-form, write-a-line-equation-from-two-points
206. Identify parallel and perpendicular lines | id: identify-parallel-and-perpendicular-lines | prerequisites: understand-reciprocals, calculate-slope-from-two-points, interpret-positive-negative-zero-and-undefined-slope
207. Model linear relationships | id: model-linear-relationships | prerequisites: model-and-solve-linear-word-problems, identify-independent-and-dependent-variables, understand-slope-as-a-rate-of-change, write-equations-in-slope-intercept-form
208. Interpret slope and intercept in context | id: interpret-slope-and-intercept-in-context | prerequisites: identify-independent-and-dependent-variables, understand-slope-as-a-rate-of-change, write-equations-in-slope-intercept-form, model-linear-relationships
209. Solve systems by graphing | id: solve-systems-by-graphing | prerequisites: graph-lines-from-slope-and-intercept, write-equations-in-slope-intercept-form
210. Solve systems by substitution | id: solve-systems-by-substitution | prerequisites: solve-multi-step-linear-equations, use-function-notation, write-equations-in-slope-intercept-form
211. Solve systems by elimination | id: solve-systems-by-elimination | prerequisites: add-integers-using-sign-rules, combine-like-terms, solve-multi-step-linear-equations
212. Graph linear inequalities in two variables | id: graph-linear-inequalities-in-two-variables | prerequisites: graph-one-variable-inequalities, plot-points-in-the-coordinate-plane, graph-lines-from-slope-and-intercept
213. Graph systems of linear inequalities | id: graph-systems-of-linear-inequalities | prerequisites: solve-compound-inequalities-with-and, solve-compound-inequalities-with-or, graph-linear-inequalities-in-two-variables

## I. Polynomials, factoring, and quadratics

214. Identify monomials and polynomials | id: identify-monomials-and-polynomials | prerequisites: identify-terms-coefficients-and-factors, simplify-expressions-with-exponents
215. Classify polynomials by degree and terms | id: classify-polynomials-by-degree-and-terms | prerequisites: understand-whole-number-exponents, identify-terms-coefficients-and-factors, identify-monomials-and-polynomials
216. Add and subtract polynomials | id: add-and-subtract-polynomials | prerequisites: combine-like-terms, identify-monomials-and-polynomials
217. Multiply monomials | id: multiply-monomials | prerequisites: multiply-signed-numbers, use-exponent-product-and-quotient-rules, identify-monomials-and-polynomials
218. Multiply a polynomial by a monomial | id: multiply-a-polynomial-by-a-monomial | prerequisites: apply-the-distributive-property-algebraically, multiply-monomials
219. Multiply binomials | id: multiply-binomials | prerequisites: apply-the-distributive-property-algebraically, add-and-subtract-polynomials, multiply-a-polynomial-by-a-monomial
220. Multiply general polynomials | id: multiply-general-polynomials | prerequisites: apply-the-distributive-property-algebraically, add-and-subtract-polynomials, multiply-binomials
221. Recognize special polynomial products | id: recognize-special-polynomial-products | prerequisites: multiply-binomials, multiply-general-polynomials
222. Factor out a greatest common monomial | id: factor-out-a-greatest-common-monomial | prerequisites: find-greatest-common-factors, apply-the-distributive-property-algebraically, multiply-monomials
223. Factor trinomials with leading coefficient 1 | id: factor-trinomials-with-leading-coefficient-1 | prerequisites: identify-factor-pairs, multiply-binomials, factor-out-a-greatest-common-monomial
224. Factor trinomials with other leading coefficients | id: factor-trinomials-with-other-leading-coefficients | prerequisites: use-the-distributive-property-with-whole-numbers, identify-factor-pairs, multiply-binomials, factor-trinomials-with-leading-coefficient-1
225. Factor differences of squares | id: factor-differences-of-squares | prerequisites: understand-squares-and-square-roots, recognize-special-polynomial-products, factor-out-a-greatest-common-monomial
226. Factor perfect-square trinomials | id: factor-perfect-square-trinomials | prerequisites: recognize-special-polynomial-products, factor-trinomials-with-leading-coefficient-1
227. Factor by grouping | id: factor-by-grouping | prerequisites: apply-the-distributive-property-algebraically, multiply-general-polynomials, factor-out-a-greatest-common-monomial
228. Choose and complete a factoring strategy | id: choose-and-complete-a-factoring-strategy | prerequisites: factor-trinomials-with-leading-coefficient-1, factor-trinomials-with-other-leading-coefficients, factor-differences-of-squares, factor-perfect-square-trinomials, factor-by-grouping
229. Understand quadratic functions and parabolas | id: understand-quadratic-functions-and-parabolas | prerequisites: determine-whether-a-relation-is-a-function, graph-lines-from-slope-and-intercept, classify-polynomials-by-degree-and-terms
230. Graph quadratics from tables | id: graph-quadratics-from-tables | prerequisites: plot-points-in-the-coordinate-plane, evaluate-functions-from-formulas, understand-quadratic-functions-and-parabolas
231. Interpret vertex, axis, and intercepts | id: interpret-vertex-axis-and-intercepts | prerequisites: read-coordinates-from-graphs, understand-quadratic-functions-and-parabolas, graph-quadratics-from-tables
232. Solve quadratic equations by factoring | id: solve-quadratic-equations-by-factoring | prerequisites: test-whether-a-value-solves-an-equation, choose-and-complete-a-factoring-strategy
233. Solve quadratic equations by square roots | id: solve-quadratic-equations-by-square-roots | prerequisites: understand-squares-and-square-roots, test-whether-a-value-solves-an-equation, solve-quadratic-equations-by-factoring
234. Complete the square | id: complete-the-square | prerequisites: simplify-expressions-with-fractions, recognize-special-polynomial-products, solve-quadratic-equations-by-square-roots
235. Derive and use the quadratic formula | id: derive-and-use-the-quadratic-formula | prerequisites: simplify-expressions-with-fractions, solve-literal-equations-for-a-variable, complete-the-square
236. Connect quadratic roots, factors, and intercepts | id: connect-quadratic-roots-factors-and-intercepts | prerequisites: choose-and-complete-a-factoring-strategy, interpret-vertex-axis-and-intercepts, solve-quadratic-equations-by-factoring, derive-and-use-the-quadratic-formula

## J. Rational, radical, exponential, and logarithmic functions

237. Simplify rational expressions by factoring | id: simplify-rational-expressions-by-factoring | prerequisites: simplify-fractions-using-common-factors, understand-reciprocals, choose-and-complete-a-factoring-strategy
238. Identify restrictions of rational expressions | id: identify-restrictions-of-rational-expressions | prerequisites: understand-zero, identify-domain-and-range-from-finite-relations, simplify-rational-expressions-by-factoring
239. Multiply and divide rational expressions | id: multiply-and-divide-rational-expressions | prerequisites: multiply-two-fractions, divide-fractions, simplify-rational-expressions-by-factoring, identify-restrictions-of-rational-expressions
240. Add and subtract rational expressions | id: add-and-subtract-rational-expressions | prerequisites: add-fractions-with-unlike-denominators, subtract-fractions-with-unlike-denominators, find-least-common-multiples, simplify-rational-expressions-by-factoring
241. Solve rational equations | id: solve-rational-equations | prerequisites: solve-equations-containing-fractions, check-equations-for-extraneous-solutions, multiply-and-divide-rational-expressions, add-and-subtract-rational-expressions
242. Understand radicals and principal roots | id: understand-radicals-and-principal-roots | prerequisites: understand-squares-and-square-roots, estimate-irrational-square-roots, classify-natural-whole-integer-rational-and-irrational-numbers
243. Simplify square-root expressions | id: simplify-square-root-expressions | prerequisites: find-prime-factorizations, understand-squares-and-square-roots, understand-radicals-and-principal-roots
244. Add and multiply radical expressions | id: add-and-multiply-radical-expressions | prerequisites: apply-the-distributive-property-algebraically, add-and-subtract-polynomials, simplify-square-root-expressions
245. Understand rational exponents | id: understand-rational-exponents | prerequisites: understand-reciprocals, understand-cubes-and-cube-roots, understand-negative-integer-exponents, understand-radicals-and-principal-roots
246. Recognize exponential functions | id: recognize-exponential-functions | prerequisites: evaluate-powers, determine-whether-a-relation-is-a-function, evaluate-functions-from-formulas
247. Graph exponential growth and decay | id: graph-exponential-growth-and-decay | prerequisites: convert-among-fractions-decimals-and-percents, plot-points-in-the-coordinate-plane, evaluate-functions-from-tables-and-graphs, recognize-exponential-functions
248. Model exponential growth and decay | id: model-exponential-growth-and-decay | prerequisites: find-a-percent-of-a-quantity, use-formulas-by-substitution, model-linear-relationships, graph-exponential-growth-and-decay
249. Understand inverse functions conceptually | id: understand-inverse-functions-conceptually | prerequisites: determine-whether-a-relation-is-a-function, use-function-notation, identify-domain-and-range-from-finite-relations
250. Find inverses of one-to-one functions | id: find-inverses-of-one-to-one-functions | prerequisites: solve-literal-equations-for-a-variable, use-function-notation, understand-inverse-functions-conceptually
251. Define logarithms as inverse exponents | id: define-logarithms-as-inverse-exponents | prerequisites: recognize-exponential-functions, understand-inverse-functions-conceptually, find-inverses-of-one-to-one-functions
252. Evaluate common logarithmic expressions | id: evaluate-common-logarithmic-expressions | prerequisites: evaluate-powers, define-logarithms-as-inverse-exponents
253. Apply logarithm product, quotient, and power laws | id: apply-logarithm-product-quotient-and-power-laws | prerequisites: use-exponent-product-and-quotient-rules, define-logarithms-as-inverse-exponents, evaluate-common-logarithmic-expressions
254. Solve simple exponential equations | id: solve-simple-exponential-equations | prerequisites: solve-multi-step-linear-equations, recognize-exponential-functions, define-logarithms-as-inverse-exponents
255. Solve simple logarithmic equations | id: solve-simple-logarithmic-equations | prerequisites: solve-multi-step-linear-equations, check-equations-for-extraneous-solutions, define-logarithms-as-inverse-exponents, apply-logarithm-product-quotient-and-power-laws

## K. Geometry and trigonometry needed for calculus

256. Measure and classify angles | id: measure-and-classify-angles | prerequisites: compare-numbers-with-symbols, use-order-of-operations-with-whole-numbers
257. Use degrees and radians | id: use-degrees-and-radians | prerequisites: interpret-a-fraction-as-division, solve-proportions-with-cross-products, measure-and-classify-angles
258. Find perimeter and area of basic figures | id: find-perimeter-and-area-of-basic-figures | prerequisites: interpret-multiplication-as-equal-groups, multiply-two-digit-numbers, recognize-equal-parts-of-a-whole
259. Use the Pythagorean theorem | id: use-the-pythagorean-theorem | prerequisites: understand-squares-and-square-roots, find-perimeter-and-area-of-basic-figures
260. Understand similarity and scale factors | id: understand-similarity-and-scale-factors | prerequisites: express-and-simplify-ratios, solve-proportions-by-scaling, measure-and-classify-angles
261. Define sine, cosine, and tangent with right triangles | id: define-sine-cosine-and-tangent-with-right-triangles | prerequisites: divide-fractions, use-the-pythagorean-theorem, understand-similarity-and-scale-factors
262. Understand the unit circle | id: understand-the-unit-circle | prerequisites: plot-points-in-the-coordinate-plane, use-degrees-and-radians, use-the-pythagorean-theorem, define-sine-cosine-and-tangent-with-right-triangles
263. Evaluate trigonometric functions at special angles | id: evaluate-trigonometric-functions-at-special-angles | prerequisites: simplify-square-root-expressions, understand-the-unit-circle
264. Graph sine and cosine | id: graph-sine-and-cosine | prerequisites: plot-points-in-the-coordinate-plane, determine-whether-a-relation-is-a-function, use-degrees-and-radians, understand-the-unit-circle, evaluate-trigonometric-functions-at-special-angles
265. Graph tangent | id: graph-tangent | prerequisites: understand-reciprocals, plot-points-in-the-coordinate-plane, determine-whether-a-relation-is-a-function, understand-the-unit-circle, evaluate-trigonometric-functions-at-special-angles
266. Use basic trigonometric identities | id: use-basic-trigonometric-identities | prerequisites: understand-reciprocals, recognize-special-polynomial-products, define-sine-cosine-and-tangent-with-right-triangles, understand-the-unit-circle
267. Understand inverse trigonometric functions | id: understand-inverse-trigonometric-functions | prerequisites: understand-inverse-functions-conceptually, define-sine-cosine-and-tangent-with-right-triangles, understand-the-unit-circle

## L. Precalculus foundations

268. Describe function transformations | id: describe-function-transformations | prerequisites: evaluate-functions-from-tables-and-graphs, graph-lines-from-slope-and-intercept, understand-quadratic-functions-and-parabolas, graph-exponential-growth-and-decay, graph-sine-and-cosine
269. Combine functions arithmetically | id: combine-functions-arithmetically | prerequisites: evaluate-expressions-with-fractions, evaluate-expressions-with-decimals, use-function-notation, simplify-rational-expressions-by-factoring
270. Compose functions | id: compose-functions | prerequisites: use-function-notation, evaluate-functions-from-formulas, combine-functions-arithmetically
271. Determine domains of algebraic functions | id: determine-domains-of-algebraic-functions | prerequisites: understand-interval-notation, identify-domain-and-range-from-finite-relations, identify-restrictions-of-rational-expressions, understand-radicals-and-principal-roots
272. Analyze piecewise-defined functions | id: analyze-piecewise-defined-functions | prerequisites: solve-compound-inequalities-with-and, solve-compound-inequalities-with-or, use-function-notation, evaluate-functions-from-tables-and-graphs
273. Understand average rate of change | id: understand-average-rate-of-change | prerequisites: calculate-slope-from-two-points, interpret-slope-and-intercept-in-context, combine-functions-arithmetically
274. Understand sequences as functions | id: understand-sequences-as-functions | prerequisites: determine-whether-a-relation-is-a-function, use-function-notation, understand-whole-number-exponents
275. Write geometric sequences | id: write-geometric-sequences | prerequisites: recall-single-digit-multiplication-facts, recognize-exponential-functions, understand-sequences-as-functions
276. Analyze polynomial end behavior | id: analyze-polynomial-end-behavior | prerequisites: multiply-signed-numbers, classify-polynomials-by-degree-and-terms, understand-quadratic-functions-and-parabolas
277. Analyze rational-function asymptotes | id: analyze-rational-function-asymptotes | prerequisites: understand-negative-integer-exponents, identify-restrictions-of-rational-expressions, solve-rational-equations, describe-function-transformations
278. Understand instantaneous rate as a limiting idea | id: understand-instantaneous-rate-as-a-limiting-idea | prerequisites: understand-average-rate-of-change

## M. Limits and continuity

279. Approach a value from a table | id: approach-a-value-from-a-table | prerequisites: compare-and-order-decimals, evaluate-functions-from-tables-and-graphs, understand-average-rate-of-change
280. Estimate limits from graphs | id: estimate-limits-from-graphs | prerequisites: read-coordinates-from-graphs, describe-function-transformations, approach-a-value-from-a-table
281. Use informal limit notation | id: use-informal-limit-notation | prerequisites: understand-variables-and-constants, approach-a-value-from-a-table, estimate-limits-from-graphs
282. Distinguish function value from limit | id: distinguish-function-value-from-limit | prerequisites: analyze-piecewise-defined-functions, estimate-limits-from-graphs, use-informal-limit-notation
283. Estimate one-sided limits | id: estimate-one-sided-limits | prerequisites: understand-interval-notation, analyze-piecewise-defined-functions, estimate-limits-from-graphs, use-informal-limit-notation
284. Identify infinite limits graphically | id: identify-infinite-limits-graphically | prerequisites: analyze-rational-function-asymptotes, estimate-limits-from-graphs, estimate-one-sided-limits
285. Apply the constant and identity limit laws | id: apply-the-constant-and-identity-limit-laws | prerequisites: evaluate-one-variable-expressions, use-informal-limit-notation
286. Apply sum, difference, and constant-multiple limit laws | id: apply-sum-difference-and-constant-multiple-limit-laws | prerequisites: add-integers-using-sign-rules, combine-functions-arithmetically, apply-the-constant-and-identity-limit-laws
287. Apply product and quotient limit laws | id: apply-product-and-quotient-limit-laws | prerequisites: multiply-and-divide-rational-expressions, combine-functions-arithmetically, apply-sum-difference-and-constant-multiple-limit-laws
288. Evaluate limits by direct substitution | id: evaluate-limits-by-direct-substitution | prerequisites: evaluate-functions-from-formulas, apply-the-constant-and-identity-limit-laws, apply-sum-difference-and-constant-multiple-limit-laws, apply-product-and-quotient-limit-laws
289. Evaluate indeterminate polynomial limits by factoring | id: evaluate-indeterminate-polynomial-limits-by-factoring | prerequisites: choose-and-complete-a-factoring-strategy, connect-quadratic-roots-factors-and-intercepts, apply-product-and-quotient-limit-laws, evaluate-limits-by-direct-substitution
290. Evaluate radical limits by conjugates | id: evaluate-radical-limits-by-conjugates | prerequisites: recognize-special-polynomial-products, simplify-square-root-expressions, add-and-multiply-radical-expressions, apply-product-and-quotient-limit-laws, evaluate-limits-by-direct-substitution
291. Evaluate limits involving piecewise functions | id: evaluate-limits-involving-piecewise-functions | prerequisites: analyze-piecewise-defined-functions, estimate-one-sided-limits, evaluate-limits-by-direct-substitution
292. Understand continuity at a point | id: understand-continuity-at-a-point | prerequisites: distinguish-function-value-from-limit, estimate-one-sided-limits, evaluate-limits-by-direct-substitution
293. Classify removable, jump, and infinite discontinuities | id: classify-removable-jump-and-infinite-discontinuities | prerequisites: distinguish-function-value-from-limit, estimate-one-sided-limits, identify-infinite-limits-graphically, understand-continuity-at-a-point
294. Determine intervals of continuity | id: determine-intervals-of-continuity | prerequisites: understand-interval-notation, determine-domains-of-algebraic-functions, understand-continuity-at-a-point, classify-removable-jump-and-infinite-discontinuities
295. Apply the intermediate value theorem | id: apply-the-intermediate-value-theorem | prerequisites: compare-and-order-signed-numbers, understand-continuity-at-a-point, determine-intervals-of-continuity
296. Understand limits at infinity | id: understand-limits-at-infinity | prerequisites: understand-negative-integer-exponents, analyze-polynomial-end-behavior, analyze-rational-function-asymptotes, identify-infinite-limits-graphically

## N. Introductory derivatives

297. Interpret the difference quotient | id: interpret-the-difference-quotient | prerequisites: simplify-expressions-with-fractions, understand-average-rate-of-change, understand-instantaneous-rate-as-a-limiting-idea
298. Estimate instantaneous rate numerically | id: estimate-instantaneous-rate-numerically | prerequisites: approach-a-value-from-a-table, interpret-the-difference-quotient
299. Estimate tangent slope graphically | id: estimate-tangent-slope-graphically | prerequisites: calculate-slope-from-two-points, estimate-limits-from-graphs, interpret-the-difference-quotient
300. Define the derivative as a limit | id: define-the-derivative-as-a-limit | prerequisites: use-informal-limit-notation, apply-sum-difference-and-constant-multiple-limit-laws, apply-product-and-quotient-limit-laws, interpret-the-difference-quotient
301. Find derivatives from the definition | id: find-derivatives-from-the-definition | prerequisites: simplify-linear-expressions, evaluate-indeterminate-polynomial-limits-by-factoring, define-the-derivative-as-a-limit
302. Connect differentiability and continuity | id: connect-differentiability-and-continuity | prerequisites: understand-continuity-at-a-point, define-the-derivative-as-a-limit, find-derivatives-from-the-definition
303. Interpret derivative notation | id: interpret-derivative-notation | prerequisites: understand-variables-and-constants, use-function-notation, define-the-derivative-as-a-limit
304. Interpret the derivative as a function | id: interpret-the-derivative-as-a-function | prerequisites: determine-whether-a-relation-is-a-function, use-function-notation, define-the-derivative-as-a-limit, interpret-derivative-notation
305. Differentiate constants and powers | id: differentiate-constants-and-powers | prerequisites: use-exponent-product-and-quotient-rules, understand-rational-exponents, define-the-derivative-as-a-limit, find-derivatives-from-the-definition
306. Apply constant-multiple, sum, and difference rules | id: apply-constant-multiple-sum-and-difference-rules | prerequisites: combine-like-terms, add-and-subtract-polynomials, apply-sum-difference-and-constant-multiple-limit-laws, differentiate-constants-and-powers
307. Differentiate polynomial functions | id: differentiate-polynomial-functions | prerequisites: classify-polynomials-by-degree-and-terms, add-and-subtract-polynomials, differentiate-constants-and-powers, apply-constant-multiple-sum-and-difference-rules
308. Apply the product rule | id: apply-the-product-rule | prerequisites: multiply-general-polynomials, apply-product-and-quotient-limit-laws, define-the-derivative-as-a-limit, apply-constant-multiple-sum-and-difference-rules
309. Apply the quotient rule | id: apply-the-quotient-rule | prerequisites: multiply-and-divide-rational-expressions, apply-product-and-quotient-limit-laws, define-the-derivative-as-a-limit, apply-the-product-rule
310. Apply the chain rule conceptually | id: apply-the-chain-rule-conceptually | prerequisites: compose-functions, define-the-derivative-as-a-limit, interpret-the-derivative-as-a-function
311. Differentiate compositions with the chain rule | id: differentiate-compositions-with-the-chain-rule | prerequisites: compose-functions, differentiate-constants-and-powers, apply-constant-multiple-sum-and-difference-rules, apply-the-chain-rule-conceptually
312. Differentiate exponential functions | id: differentiate-exponential-functions | prerequisites: recognize-exponential-functions, solve-simple-exponential-equations, define-the-derivative-as-a-limit, differentiate-compositions-with-the-chain-rule
313. Differentiate logarithmic functions | id: differentiate-logarithmic-functions | prerequisites: define-logarithms-as-inverse-exponents, apply-logarithm-product-quotient-and-power-laws, solve-simple-logarithmic-equations, define-the-derivative-as-a-limit, apply-the-quotient-rule, differentiate-compositions-with-the-chain-rule
314. Differentiate sine and cosine | id: differentiate-sine-and-cosine | prerequisites: graph-sine-and-cosine, use-basic-trigonometric-identities, define-the-derivative-as-a-limit, apply-constant-multiple-sum-and-difference-rules
315. Differentiate other trigonometric functions | id: differentiate-other-trigonometric-functions | prerequisites: graph-tangent, use-basic-trigonometric-identities, apply-the-quotient-rule, differentiate-sine-and-cosine
316. Differentiate inverse trigonometric functions | id: differentiate-inverse-trigonometric-functions | prerequisites: understand-inverse-trigonometric-functions, apply-the-quotient-rule, differentiate-compositions-with-the-chain-rule, differentiate-other-trigonometric-functions
317. Use implicit differentiation | id: use-implicit-differentiation | prerequisites: solve-equations-with-variables-on-both-sides, solve-literal-equations-for-a-variable, apply-the-product-rule, apply-the-quotient-rule, differentiate-compositions-with-the-chain-rule
318. Differentiate functions involving radicals | id: differentiate-functions-involving-radicals | prerequisites: simplify-square-root-expressions, understand-rational-exponents, differentiate-compositions-with-the-chain-rule
319. Find equations of tangent and normal lines | id: find-equations-of-tangent-and-normal-lines | prerequisites: write-point-slope-equations, estimate-tangent-slope-graphically, interpret-derivative-notation, differentiate-polynomial-functions
320. Interpret derivatives as physical rates | id: interpret-derivatives-as-physical-rates | prerequisites: understand-rates-and-unit-rates, interpret-slope-and-intercept-in-context, estimate-instantaneous-rate-numerically, interpret-the-derivative-as-a-function
321. Solve basic related-rates problems | id: solve-basic-related-rates-problems | prerequisites: use-formulas-by-substitution, solve-literal-equations-for-a-variable, find-perimeter-and-area-of-basic-figures, use-the-pythagorean-theorem, differentiate-compositions-with-the-chain-rule, interpret-derivatives-as-physical-rates
322. Find critical numbers | id: find-critical-numbers | prerequisites: understand-interval-notation, determine-domains-of-algebraic-functions, interpret-the-derivative-as-a-function, differentiate-polynomial-functions
323. Determine increasing and decreasing intervals | id: determine-increasing-and-decreasing-intervals | prerequisites: compare-and-order-signed-numbers, understand-interval-notation, interpret-the-derivative-as-a-function, find-critical-numbers
324. Identify local extrema with the first derivative | id: identify-local-extrema-with-the-first-derivative | prerequisites: interpret-vertex-axis-and-intercepts, interpret-the-derivative-as-a-function, find-critical-numbers, determine-increasing-and-decreasing-intervals
325. Interpret the second derivative and concavity | id: interpret-the-second-derivative-and-concavity | prerequisites: interpret-the-derivative-as-a-function, differentiate-polynomial-functions, determine-increasing-and-decreasing-intervals
326. Solve introductory optimization problems | id: solve-introductory-optimization-problems | prerequisites: model-and-solve-linear-word-problems, find-perimeter-and-area-of-basic-figures, find-equations-of-tangent-and-normal-lines, find-critical-numbers, identify-local-extrema-with-the-first-derivative

## Count and boundary

- Total nodes: **326**
- Entry point: `match-objects-one-to-one`
- Final node by display order: `solve-introductory-optimization-problems`
- Calculus boundary: limits, continuity, derivative rules, implicit differentiation, related rates, curve analysis, and introductory optimization.
- Excluded from this spine: antiderivatives, definite integrals, the Fundamental Theorem of Calculus, general geometric proof, statistics, finance, and nonessential measurement topics.
