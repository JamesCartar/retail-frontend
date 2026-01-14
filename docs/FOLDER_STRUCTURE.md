# Project Structure Documentation

This document outlines the complete folder structure and organization of the retail frontend application following modern frontend development best practices.

## 📁 Folder Structure

```
retail-frontend/
├── common/                      # Shared utilities, constants, and types
│   ├── constants/
│   │   └── index.ts            # App-wide constants (routes, API endpoints, messages)
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── index.ts            # Utility functions (formatting, validation, etc.)
│   └── validators/
│       └── index.ts            # Form validation schemas
│
├── components/
│   ├── forms/                   # Reusable form components
│   │   ├── FormWrapper.tsx     # Base form wrapper with submit handling
│   │   ├── FormField.tsx       # Input field with label and error
│   │   ├── FormTextarea.tsx    # Textarea field component
│   │   ├── FormSelect.tsx      # Select dropdown component
│   │   └── index.ts            # Form components exports
│   │
│   ├── pages/                   # Page-specific components
│   │   ├── home/               # Home page components
│   │   │   ├── StatsCard.tsx   # Dashboard statistics card
│   │   │   ├── QuickActions.tsx # Quick action buttons
│   │   │   ├── RecentActivity.tsx # Recent records display
│   │   │   └── index.ts
│   │   │
│   │   ├── add-record/         # Add Record page components
│   │   │   ├── RecordForm.tsx  # Record creation form
│   │   │   └── index.ts
│   │   │
│   │   ├── view-records/       # View Records page components
│   │   │   ├── RecordsTable.tsx    # Records data table
│   │   │   ├── RecordsFilter.tsx   # Filter controls
│   │   │   ├── Pagination.tsx      # Pagination component
│   │   │   └── index.ts
│   │   │
│   │   └── add-fee/            # Add Fee page components
│   │       ├── FeeForm.tsx     # Fee creation form
│   │       ├── FeeCalculator.tsx # Fee calculation tool
│   │       └── index.ts
│   │
│   └── ui/                      # shadcn/ui components (shared)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── layout.tsx          # Shared layout component
│
├── lib/
│   ├── api/                     # API service layer
│   │   ├── client.ts           # Axios client with interceptors
│   │   ├── auth.ts             # Authentication API
│   │   ├── products.ts         # Products API
│   │   ├── records.ts          # Records API
│   │   └── fees.ts             # Fees API
│   │
│   ├── store/                   # Zustand state management
│   │   └── authStore.ts        # Authentication store
│   │
│   └── utils.ts                 # lib-specific utilities
│
├── pages/                       # Next.js pages (routes)
│   ├── _app.tsx                # App wrapper with auth
│   ├── _document.tsx           # HTML document
│   ├── index.tsx               # Home page (/)
│   ├── login.tsx               # Login page (/login)
│   ├── register.tsx            # Register page (/register)
│   ├── products.tsx            # Products page (/products)
│   │
│   ├── records/                # Records routes
│   │   ├── add.tsx            # Add record (/records/add)
│   │   └── view.tsx           # View records (/records/view)
│   │
│   └── fees/                   # Fees routes
│       └── add.tsx            # Add fee (/fees/add)
│
├── styles/
│   └── globals.css             # Global styles with Tailwind
│
├── utils/
│   └── cn.ts                   # Legacy utility (kept for compatibility)
│
└── [config files]              # tsconfig, next.config, etc.
```

## 🚀 Routes

The application has the following routes:

| Route | File | Description |
|-------|------|-------------|
| `/` | `pages/index.tsx` | Home dashboard with stats and quick actions |
| `/login` | `pages/login.tsx` | User login page |
| `/register` | `pages/register.tsx` | User registration page |
| `/records/add` | `pages/records/add.tsx` | Create new record |
| `/records/view` | `pages/records/view.tsx` | View and manage records |
| `/fees/add` | `pages/fees/add.tsx` | Add new fee |

## 📦 Key Features by Folder

### common/

**Purpose**: Centralized location for shared code that's used across multiple pages and components.

- **constants/**: App-wide constants including:
  - API endpoints
  - Route paths
  - Form field types
  - Pagination defaults
  - Validation messages
  - Toast messages

- **types/**: TypeScript type definitions for:
  - Domain models (User, RecordItem, Fee)
  - API responses
  - Form configurations
  - Table configurations
  - Filter configurations

- **utils/**: Reusable utility functions:
  - `cn()`: Tailwind class merging
  - `formatCurrency()`: Money formatting
  - `formatDate()`: Date formatting
  - `debounce()`: Function debouncing
  - Form helpers
  - Validation helpers

- **validators/**: Form validation schemas:
  - Validation rules for all form fields
  - Reusable validation patterns
  - Custom validators

### components/forms/

**Purpose**: Reusable form components that work with React Hook Form.

All form components accept:
- Standard HTML props
- React Hook Form registration
- Error messages
- Help text
- Custom styling

**Benefits**:
- Consistent form styling
- Built-in error handling
- Reduced code duplication
- Easy to extend and customize

### components/pages/

**Purpose**: Page-specific components organized by feature.

**Pattern**: Each page has its own folder containing:
- UI components specific to that page
- Business logic components
- Data display components
- An `index.ts` for clean exports

**Benefits**:
- Clear component ownership
- Easy to locate components
- Prevents naming conflicts
- Encourages component reusability

### components/ui/

**Purpose**: shadcn/ui components - shared, primitive UI components.

These are:
- Highly reusable
- Fully customizable
- Accessible by default
- Styled with Tailwind CSS

### lib/api/

**Purpose**: API service layer for all backend communication.

**Pattern**: Each service exports an object with methods:
- `getAll()` - List with pagination
- `getById()` - Get single item
- `create()` - Create new item
- `update()` - Full update
- `partialUpdate()` - Partial update
- `delete()` - Delete item

**Benefits**:
- Type-safe API calls
- Centralized error handling
- Consistent request/response patterns
- Easy to mock for testing

## 🎯 Design Patterns Used

### 1. Feature-Based Structure
- Components organized by feature/page
- Related components grouped together
- Clear separation of concerns

### 2. Reusable Forms
- Generic form components
- Composition over inheritance
- Validation separated from UI

### 3. Service Layer
- API calls abstracted into services
- Consistent error handling
- Type-safe interfaces

### 4. Constants & Configuration
- All constants in one place
- Easy to update and maintain
- Type-safe with TypeScript

### 5. Utility Functions
- Pure functions for common operations
- Reusable across the app
- Well-tested and documented

## 🔧 Usage Examples

### Using Form Components

```typescript
import { FormWrapper, FormField, FormSelect } from '@/components/forms';
import { recordFormValidation } from '@/common/validators';

function MyForm() {
  const handleSubmit = async (data) => {
    // Handle submission
  };

  return (
    <FormWrapper onSubmit={handleSubmit} submitLabel="Save">
      {({ register, formState: { errors } }) => (
        <>
          <FormField
            label="Title"
            required
            error={errors.title?.message}
            registration={register('title', recordFormValidation.title)}
          />
        </>
      )}
    </FormWrapper>
  );
}
```

### Using API Services

```typescript
import { recordService } from '@/lib/api/records';
import { TOAST_MESSAGES } from '@/common/constants';

async function fetchRecords() {
  try {
    const response = await recordService.getAll({
      page: 1,
      perPage: 10,
      filters: { status: 'pending' }
    });
    console.log(response.data);
  } catch (error) {
    console.error(TOAST_MESSAGES.ERROR.GENERIC);
  }
}
```

### Using Constants

```typescript
import { ROUTES, API_ENDPOINTS } from '@/common/constants';

// Navigation
router.push(ROUTES.ADD_RECORD);

// API calls
const url = API_ENDPOINTS.RECORDS.GET(id);
```

### Using Utilities

```typescript
import { formatCurrency, formatDate, cn } from '@/common/utils';

const price = formatCurrency(99.99); // "$99.99"
const date = formatDate('2024-01-01'); // "Jan 01, 2024"
const classes = cn('base-class', isActive && 'active-class');
```

## 📚 Best Practices

1. **Import Aliases**: Use `@/` for absolute imports
2. **Component Organization**: Keep related components together
3. **Type Safety**: Define types for all data structures
4. **Error Handling**: Use try-catch and display user-friendly messages
5. **Validation**: Centralize validation rules
6. **Constants**: Never hardcode values that might change
7. **Reusability**: Extract common patterns into shared components
8. **Documentation**: Comment complex logic and exported functions

## 🔄 Adding New Features

### Adding a New Page

1. Create page file in `pages/` directory
2. Create page-specific components in `components/pages/[feature]/`
3. Add route constant to `common/constants/index.ts`
4. Create API service if needed in `lib/api/`
5. Add types to `common/types/index.ts`

### Adding a New Form

1. Use existing form components from `components/forms/`
2. Define validation schema in `common/validators/index.ts`
3. Create types in `common/types/index.ts`
4. Implement submission handler using API service

### Adding New Shared Components

1. Add to `components/ui/` if it's a primitive component
2. Add to `components/forms/` if it's a form component
3. Add to appropriate `components/pages/` folder if page-specific

## 🎨 Styling Guidelines

- Use Tailwind CSS utility classes
- Use `cn()` utility for conditional classes
- Define custom colors in `tailwind.config.js`
- Use shadcn/ui components for consistency
- Follow responsive-first approach

## 🔐 Security Considerations

- Never store sensitive data in constants
- Use environment variables for configuration
- Validate all user input
- Sanitize data before display
- Use TypeScript for type safety

---

This structure follows industry best practices and scales well as the application grows.
