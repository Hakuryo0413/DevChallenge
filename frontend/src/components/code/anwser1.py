from typing import List
import sys
import json

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        return []

def parse_input():
    lines = sys.stdin.read().splitlines()
    nums = eval(lines[0])
    target = int(lines[1])
    return nums, target

def main():
    nums, target = parse_input()
    sol = Solution()
    result = sol.twoSum(nums, target)
    print(json.dumps(result, separators=(",", ":")), end="")

if __name__ == "__main__":
    main()
