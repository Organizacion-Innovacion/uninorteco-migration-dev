# Average Calculator

## Special cases on course

### Characteristics

no-components
zero-credits
contain-invalid-grade
one-component

### Cases

```json
[no-components]
```

Explanation: The course does not have any components
Posible reasons: Unexpected error while fetching the data
Actions:

- On courses page: Display on card “Sin acceso a parcelación”
- On course detail page: Throw fatal error
- On semester average algorithm: Exclude the course from the algorithm

```json
[contain-invalid-grade]
```

Explanation: The course contains a component with an invalid grade. A valid grade is between 0 and 5.
Posible reasons: An schema error
Actions:

- On courses page: Display on card “Parcelación corrupta"
- On course detail page: Throw fatal error
- On semester average algorithm: Exclude the course from the algorithm

```json
[contain-invalid-grade, one-component]
```

Explanation: The only component of the course contains an invalid grade.
Posible reasons: An schema error

Actions:

- On courses page: Display on card “Parcelación corrupta"
- On course detail page: Throw fatal error
- On semester average algorithm: Exclude the course from the algorithm

```json
[contain-invalid-grade, one-component, zero-credits]
```

Explanation: The only component of the course contains an invalid grade. Also the course has zero credits.
Posible reasons: Special courses such as 'proyecto de vida'

Actions:

- On courses page: Display on card “Parcelación irrelevante"
- On course detail page: Throw fatal error
- On semester average algorithm: Exclude the course from the algorithm
