  # Weather Forecast Testing

## Test 1: Successful Search
Input: Melbourne
Result: Pass - Seven-day forecast displayed with the Wind column.

## Test 2: Empty Search
Input: Blank
Result: Pass - Warning message displayed and previous forecast cleared.

## Test 3: Unknown Place
Input: Xyzabc
Result: Pass - No matching place message displayed.

## Test 4: Offline Mode
Condition: Browser Network set to Offline
Result: Pass - Forecast loading error displayed.

## Test 5: Back Online
Condition: Browser Network restored to Online
Result: Pass - Melbourne forecast loaded successfully.

