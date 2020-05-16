/* 
동적 계획법
수식 / 점화식 : 규칙발견
작은것으로부터 규칙 찾고 계산최소화

7
10 15
13 max(11, 16) 15
15 max(20,25) max(20, 19) 19
*/

function solution(triangle){
    let matrix = [triangle[0][0]];  //[7]
    triangle.splice(0,1)    //splice(index, num, value) 인덱스에서 개수만큼 지운다음 value 넣어라

    triangle.forEach((list) => {
        const newMatrix = [0];

        matrix.forEach((item, index) => {
            newMatrix.splice(
                index, 
                1, 
                Math.max(newMatrix[newMatrix.length - 1],item+list[index]))
            newMatrix.splice(index + 1, 0, item+list[index + 1])
        });
        matrix = newMatrix
    })
    m=matrix.sort()
    return m[m.length-1];
}

const triangle = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]

console.log(solution(triangle));