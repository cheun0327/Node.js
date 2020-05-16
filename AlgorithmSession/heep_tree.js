class HeapTree{
    constructor(){
        this.heap = [];
    }

    //show tree structure
    print() {
        let flag = 1;
        let count = 0;

        this.heap.forEach((item, index) => {
            process.stdout.write(`${item} `);
            if(index == count){
                console.log("")
                flag *= 2;  //next level flag
                count += flag;
            }
        })
    }

    insert(item){
        this.heap.push(item); //heap의 맨 끝에 원소 넣어줌

        /*child = (p+1) + 1 and (p+1) +2*/
        let childIndex = this.heap.length -1;
        let parentIndex = parseInt((childIndex - 1)/2);

        //부모가 자식보다 크면 no swap
        while(childIndex > 0 && this.heap[parentIndex] < this.heap[childIndex]){  //root까지 비교한다.
            [this.heap[parentIndex], this.heap[childIndex]] = [this.heap[childIndex], this.heap[parentIndex]]    //구조분해로 swap
            childIndex = parentIndex;   //set index
            parentIndex = parseInt((childIndex - 1)/2);
        }
    }

    get() {
        const popedItem = this.heap[0]; //root pop
    
        this.heap[0] = this.heap[this.heap.length - 1]; //맨 끝 원소를 루트로
        this.heap.splice(this.heap.length - 1, 1); // 맨 끝 삭제
    
        let parentIndex = 0;
        let childIndex = (parentIndex + 1) * 2 - 1;
    
        //자식 중에서 큰 값 찾기
        if (childIndex + 1 < this.heap.length) {
          childIndex =
            this.heap[childIndex] < this.heap[childIndex + 1]
              ? childIndex + 1
              : childIndex;
        }
    
        while (
          childIndex < this.heap.length &&
          this.heap[parentIndex] < this.heap[childIndex]
        ) {
          [this.heap[parentIndex], this.heap[childIndex]] = [
            this.heap[childIndex],
            this.heap[parentIndex],
          ];
    
          parentIndex = childIndex;
          childIndex = (childIndex + 1) * 2 - 1;
    
          if (childIndex + 1 < this.heap.length) {
            childIndex =
              this.heap[childIndex] < this.heap[childIndex + 1]
                ? childIndex + 1
                : childIndex;
          }
        }
    
        return popedItem;
      }
}

const tree = new HeapTree();
tree.insert(1)
tree.insert(2)
tree.insert(3)
tree.insert(4)
tree.insert(5)
tree.insert(6)
tree.insert(7)
tree.insert(8)
tree.print()
const popedItem = tree.get()
console.log(popedItem)
tree.print()

/* 
1.지금 시간에서 가능한 job구하기 / 작업 시간이 짧은 것이 우선순위
2.가능한 job을 tree에 넣기
3.heaptree에서 get수행
4.시간 재설정
5.1로 돌아가기
*/
