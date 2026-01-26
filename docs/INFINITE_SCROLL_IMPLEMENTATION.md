# Infinite Scroll Implementation Guide

## Overview
This document explains the infinite scroll implementation in the transfer-records view page, covering all edge cases for date filtering and pagination.

## Key Features

### 1. **10-Day Batch Loading**
- Data is fetched in 10-day chunks to optimize performance
- Each API call fetches records for exactly 10 days (or less if constrained by user filters)
- Subsequent loads fetch the previous 10 days automatically

### 2. **Date Filter Scenarios**

#### Scenario 1: No Dates Selected (Default Behavior)
- **Initial Load**: Fetches last 10 days (from 9 days ago to today)
- **Scrolling**: Each scroll fetches the previous 10 days
- **Backend Default**: If backend receives no dates, it defaults to last 10 days

#### Scenario 2: Only Start Date Selected
- **Initial Load**: Fetches 10 days starting from the selected start date
- **Scrolling**: Continues fetching previous 10-day chunks
- **Constraint**: Stops when reaching the selected start date (won't fetch data before user's start date)

#### Scenario 3: Only End Date Selected
- **Initial Load**: Fetches 10 days before the selected end date
- **Scrolling**: Continues fetching previous 10-day chunks
- **No Start Constraint**: Can scroll back indefinitely (or until earliest record in DB)

#### Scenario 4: Both Dates Selected
- **Initial Load**: Fetches records between start and end dates (respecting the date range)
- **Scrolling**: Fetches previous 10-day chunks, but stops at the user's start date
- **Constraint**: Never fetches data before the user's selected start date

## Implementation Details

### State Management

```typescript
// Cursor for tracking pagination position
const [cursorEndDate, setCursorEndDate] = useState<string | null>(null);

// Flag to indicate if more data is available
const [hasMore, setHasMore] = useState(true);

// Loading state for API calls
const [loading, setLoading] = useState(false);

// User filters stored in refs (to prevent dependency issues)
const userStartDateRef = useRef<string | null>(null);
const userEndDateRef = useRef<string | null>(null);
```

### Core Logic Flow

1. **Initial Fetch** (when filters change):
   ```
   - Reset all state (records, cursor, hasMore)
   - Determine queryStartDate and queryEndDate based on filter scenario
   - Fetch data from API
   - Set cursor to the start date of this batch
   - Update hasMore flag
   ```

2. **Pagination** (on scroll):
   ```
   - Use cursor as the reference point
   - Calculate new end date (1 day before cursor to avoid duplicates)
   - Calculate new start date (10 days before the new end date)
   - Check if new start date violates user's start date filter
   - If valid, fetch data and append to existing records
   - Update cursor and hasMore flag
   ```

### Date Format
- **Frontend to Backend**: YYYY-MM-DD (e.g., "2025-01-25")
- **All calculations use this numeric format for consistency**

### API Query Strategy

```typescript
// For initial load with no dates
startDate: formatDateToYYYYMMDD(subtractDays(today, 9))  // 10 days ago
endDate: formatDateToYYYYMMDD(today)                      // today

// For pagination
startDate: formatDateToYYYYMMDD(subtractDays(cursorDate, 10))
endDate: formatDateToYYYYMMDD(subtractDays(cursorDate, 1))
```

### Edge Case Handling

1. **No More Data**:
   - Set `hasMore = false` when:
     - API returns 0 records
     - Reached user's start date filter
     - Reached database's earliest record date

2. **Duplicate Prevention**:
   - Each pagination call uses non-overlapping date ranges
   - End date of new batch = Start date of previous batch - 1 day

3. **Loading States**:
   - Show spinner during initial load
   - Show inline loading indicator during infinite scroll
   - Show "end of data" message when no more records available

4. **Filter Changes**:
   - Complete reset of state when filters change
   - New API call with fresh parameters
   - Previous scroll position is lost (intentional for clarity)

## UI Components

### Loading Indicators
1. **Initial Load**: Full page loading (handled by empty state)
2. **Infinite Scroll**: Spinner at bottom of list
3. **No More Data**: Text message indicating end of records

### IntersectionObserver
- Triggers when user scrolls to bottom
- Only activates if:
  - `hasMore === true`
  - `loading === false`
  - Records exist
- Threshold: 10% visibility of trigger element

## Backend Requirements

### API Endpoint: `/api/records/reports`

**Query Parameters**:
- `startDate`: YYYY-MM-DD format (required)
- `endDate`: YYYY-MM-DD format (required)
- `type`: Payment type filter (optional)

**Response Format**:
```typescript
{
  transferRecords: [
    {
      date: string,
      totalAmount: number,
      totalFee: number,
      records: RecordItem[]
    }
  ],
  earliestRecordDate: string  // Earliest date in DB (for stopping pagination)
}
```

### Backend Behavior
- If no dates provided: default to last 10 days
- Return empty array if no records in date range
- Always include `earliestRecordDate` in response

## Testing Scenarios

1. **No Filters + Scroll**:
   - Load page → See last 10 days
   - Scroll down → Load previous 10 days
   - Continue scrolling → Load until earliest record

2. **Start Date Only + Scroll**:
   - Select start date (e.g., 2025-01-01)
   - Load page → See 10 days from Jan 1
   - Scroll down → Load previous batches
   - Stop at Jan 1 (won't go before)

3. **End Date Only + Scroll**:
   - Select end date (e.g., 2025-01-25)
   - Load page → See 10 days before Jan 25
   - Scroll down → Continue loading previous batches
   - Stop at earliest record in DB

4. **Both Dates + Scroll**:
   - Select range (Jan 1 - Jan 25)
   - Load page → See records in range
   - Scroll down → Load previous batches within range
   - Stop at Jan 1

5. **Filter Changes**:
   - Load with one filter
   - Change to different filter
   - Verify: Records reset, new data loaded, scroll position reset

## Performance Considerations

1. **10-Day Chunks**: Balances between:
   - Too small: Many API calls
   - Too large: Slow initial load

2. **Refs for User Filters**: Prevents unnecessary re-renders

3. **Early Return Guards**: Prevents duplicate API calls

4. **Intersection Observer**: Efficient scroll detection without scroll event listeners

## Known Limitations

1. **No Bidirectional Scroll**: Only loads backward in time
2. **Filter Reset**: Changing filters resets scroll position
3. **No Prefetching**: Fetches only on demand

## Future Enhancements

1. Add prefetching for smoother UX
2. Implement virtual scrolling for very large datasets
3. Add date range validation
4. Cache previous batches to prevent re-fetching on filter toggle
