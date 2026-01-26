# Visual Flow Diagram - Infinite Scroll

## Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (UI)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Date Filter Controls                     │ │
│  │  [Start Date]    မှ    [End Date]                     │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           Payment Type Filter Buttons                 │ │
│  │   [All] [KBZ] [Wave] [AYA] [UAB] [Other]            │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Records List (Accordion)                 │ │
│  │                                                       │ │
│  │  ▼ 25-Jan-2025                                       │ │
│  │     Total: 150,000 Ks    Fee: 5,000 Ks              │ │
│  │     • Record 1                                        │ │
│  │     • Record 2                                        │ │
│  │                                                       │ │
│  │  ▼ 24-Jan-2025                                       │ │
│  │     Total: 200,000 Ks    Fee: 7,000 Ks              │ │
│  │     • Record 1                                        │ │
│  │                                                       │ │
│  │  ... more records ...                                 │ │
│  │                                                       │ │
│  │  [Infinite Scroll Trigger]  ← IntersectionObserver   │ │
│  │  [Loading Spinner]          ← Shows when loading     │ │
│  │  [All Records Loaded]       ← Shows when complete    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow - Initial Load

```
User Opens Page
     │
     ├─→ State Initialized
     │   • records = []
     │   • cursorEndDate = null
     │   • hasMore = true
     │   • loading = false
     │
     ├─→ useEffect Triggered (fromDate, toDate, selectedPay changed)
     │
     ├─→ fetchRecords(isNextPage=false)
     │
     ├─→ Determine Date Range
     │   │
     │   ├─ No dates?
     │   │  → startDate = today - 9 days
     │   │  → endDate = today
     │   │
     │   ├─ Only startDate?
     │   │  → startDate = user's start
     │   │  → endDate = today
     │   │
     │   ├─ Only endDate?
     │   │  → startDate = endDate - 9 days
     │   │  → endDate = user's end
     │   │
     │   └─ Both dates?
     │      → startDate = user's start
     │      → endDate = user's end
     │
     ├─→ API Call: GET /api/records/reports
     │   ?startDate=2025-01-16
     │   &endDate=2025-01-25
     │   &type=kbz
     │
     ├─→ Response Received
     │   {
     │     transferRecords: [...],
     │     earliestRecordDate: "2024-01-01"
     │   }
     │
     ├─→ Update State
     │   • records = response.transferRecords
     │   • cursorEndDate = queryStartDate
     │   • hasMore = check conditions
     │   • loading = false
     │
     └─→ UI Renders with Records
```

## Data Flow - Infinite Scroll

```
User Scrolls Down
     │
     ├─→ IntersectionObserver Triggered
     │   (bottom element becomes visible)
     │
     ├─→ Check Conditions
     │   • hasMore === true?
     │   • loading === false?
     │   • records.length > 0?
     │
     ├─→ fetchRecords(isNextPage=true)
     │
     ├─→ Calculate Next Date Range
     │   • endDate = cursorEndDate - 1 day
     │   • startDate = endDate - 9 days
     │
     ├─→ Check User Constraints
     │   • If startDate < userStartDate
     │   •   → Adjust startDate = userStartDate
     │   • If startDate >= endDate
     │   •   → Stop (hasMore = false)
     │
     ├─→ API Call: GET /api/records/reports
     │   ?startDate=2025-01-06
     │   &endDate=2025-01-15
     │   &type=kbz
     │
     ├─→ Response Received
     │
     ├─→ Update State
     │   • records = [...prev, ...newRecords]
     │   • cursorEndDate = queryStartDate
     │   • hasMore = check conditions
     │   • loading = false
     │
     └─→ UI Updates with More Records
```

## Date Range Calculation - Visual Example

### Scenario: No Dates Selected, Today is Jan 25

```
┌────────────────────────────────────────────────────────────┐
│                   Timeline (Days)                          │
└────────────────────────────────────────────────────────────┘

Initial Load:
 ┌─────────────────────────┐
 │  Jan 16 ───→ Jan 25    │  (10 days)
 └─────────────────────────┘
 Cursor: Jan 16

First Scroll:
           ┌─────────────────────────┐
           │  Jan 6 ───→ Jan 15     │  (10 days)
           └─────────────────────────┘
           Cursor: Jan 6

Second Scroll:
                     ┌─────────────────────────┐
                     │ Dec 27 ───→ Jan 5      │  (10 days)
                     └─────────────────────────┘
                     Cursor: Dec 27

... continues backward in time ...
```

## State Management Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     Component State                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  useState:                                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ • records: transferRecordReport[]                      │ │
│  │ • loading: boolean                                     │ │
│  │ • cursorEndDate: string | null                        │ │
│  │ • hasMore: boolean                                     │ │
│  │ • selectedPay: PayType | null                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  useRef (prevent re-render):                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ • userStartDateRef: string | null                     │ │
│  │ • userEndDateRef: string | null                       │ │
│  │ • observerRef: HTMLDivElement | null                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  useWatch (form values):                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ • fromDate: string                                     │ │
│  │ • toDate: string                                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘

         │
         ├─→ When filters change (useEffect)
         │   • Reset all state
         │   • Update refs
         │   • Fetch fresh data
         │
         └─→ When scroll detected (IntersectionObserver)
             • Fetch next page
             • Append to records
             • Update cursor
```

## Loading States Visual

```
┌─────────────────────────────────────────────────────────────┐
│                   Loading State Flow                        │
└─────────────────────────────────────────────────────────────┘

Initial Load (No Records):
  loading: true
  records: []
  ┌──────────────────────┐
  │                      │  Empty state or full page loader
  │   [Loading...]       │
  │                      │
  └──────────────────────┘

Records Loaded:
  loading: false
  records: [...]
  hasMore: true
  ┌──────────────────────┐
  │ Record 1             │
  │ Record 2             │
  │ Record 3             │
  │ ...                  │
  │ [Scroll Trigger]     │  ← IntersectionObserver element
  └──────────────────────┘

Infinite Scroll Loading:
  loading: true
  records: [...]
  hasMore: true
  ┌──────────────────────┐
  │ Record 1             │
  │ Record 2             │
  │ Record 3             │
  │ ...                  │
  │ [Scroll Trigger]     │
  │ ⏳ [Spinner]         │  ← Loading indicator
  └──────────────────────┘

All Records Loaded:
  loading: false
  records: [...]
  hasMore: false
  ┌──────────────────────┐
  │ Record 1             │
  │ Record 2             │
  │ Record 3             │
  │ ...                  │
  │ [Scroll Trigger]     │
  │ ✓ All Loaded         │  ← End message
  └──────────────────────┘
```

## Edge Case Handling

```
┌────────────────────────────────────────────────────────────┐
│                  Edge Case Matrix                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. Empty Results                                         │
│     records.length === 0                                   │
│     → Show "No records" message                           │
│                                                            │
│  2. API Error                                             │
│     catch block triggered                                  │
│     → Log error, set hasMore = false                      │
│                                                            │
│  3. Reached Start Date Filter                             │
│     queryStartDate < userStartDate                        │
│     → Adjust date, stop if invalid range                  │
│                                                            │
│  4. Reached DB Earliest Date                              │
│     queryStartDate <= earliestRecordDate                  │
│     → Set hasMore = false                                 │
│                                                            │
│  5. Duplicate Scroll Events                               │
│     loading === true                                       │
│     → Return early, ignore                                │
│                                                            │
│  6. No More Data                                          │
│     hasMore === false                                      │
│     → Return early, show message                          │
│                                                            │
│  7. Filter Changed Mid-Scroll                             │
│     useEffect dependency change                            │
│     → Reset state, start fresh                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Performance Optimizations

```
1. Loading Guard
   if (loading) return;
   → Prevents duplicate API calls

2. hasMore Guard
   if (isNextPage && !hasMore) return;
   → Prevents unnecessary scroll checks

3. useCallback
   fetchRecords = useCallback(...)
   → Prevents function recreation

4. Refs for User Filters
   userStartDateRef.current = fromDate
   → Prevents re-render loops

5. Intersection Observer
   threshold: 0.1
   → Efficient scroll detection

6. Non-overlapping Ranges
   endDate = cursor - 1 day
   → Prevents duplicate data
```

---

## Quick Reference

**Initial Load Query**:
```
No dates:     startDate = today-9, endDate = today
Only start:   startDate = user,   endDate = today
Only end:     startDate = end-9,   endDate = user
Both:         startDate = user,    endDate = user
```

**Pagination Query**:
```
endDate = cursorDate - 1 day
startDate = endDate - 9 days
(Adjusted if < userStartDate)
```

**Stop Conditions**:
```
1. records.length === 0
2. queryStartDate <= userStartDate
3. queryStartDate <= earliestRecordDate
4. API error
```

---

Created: January 26, 2026
