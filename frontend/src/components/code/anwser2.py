from typing import List
import sys

class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k

def parse_input():
    lines = sys.stdin.read().splitlines()
    nums = eval(lines[0])  # e.g. [0,1,2,2,3,0,4,2]
    val = int(lines[1])    # e.g. 2
    return nums, val

def main():
    nums, val = parse_input()
    sol = Solution()
    k = sol.removeElement(nums, val)

    # Fill the rest with "_"
    output = nums[:k] + ["_"] * (len(nums) - k)

    # Print output
    print(k)
    print(f"[{','.join(str(x) for x in output)}]")

if __name__ == "__main__":
    main()
