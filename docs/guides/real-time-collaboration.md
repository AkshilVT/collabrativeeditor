# Backend Scoping Document

## Overview

This document outlines the backend requirements and implementation strategy for the Multi-Mode Collaborative Editor Suite, focusing on real-time collaboration features.

## Real-time Collaboration Requirements

### Current Scope

1. **Rich Text Editor Collaboration**
   - Real-time document synchronization
   - Presence awareness (who's online)
   - Cursor positions
   - Basic conflict resolution

### Implementation Options

#### 1. Liveblocks

**Pros:**

- Free tier available (up to 100 concurrent users)
- Built-in presence and cursor features
- Excellent React integration
- No backend setup required
- Real-time conflict resolution
- Built-in persistence

**Cons:**

- Limited free tier
- Vendor lock-in
- No self-hosting option

#### 2. Yjs + WebSocket

**Pros:**

- Open source
- Self-hostable
- More control over implementation
- No user limits
- Can use with any WebSocket provider

**Cons:**

- Requires more setup
- Need to implement presence and cursor features
- Need to handle WebSocket server

#### 3. Supabase Realtime

**Pros:**

- Free tier available
- PostgreSQL database included
- Real-time subscriptions
- Built-in authentication (if needed later)
- Self-hostable option available

**Cons:**

- Requires more setup than Liveblocks
- Need to implement conflict resolution
- Need to handle presence and cursor features

## Recommended Approach

### Phase 1: Liveblocks Implementation

1. Start with Liveblocks free tier
2. Implement basic real-time collaboration
3. Add presence and cursor features
4. Test with multiple users

### Phase 2: Migration Path (if needed)

1. If user base grows beyond free tier:
   - Consider migrating to Yjs + WebSocket
   - Or upgrade to Liveblocks paid tier
2. If self-hosting becomes necessary:
   - Implement Yjs with custom WebSocket server
   - Or use Supabase self-hosted option

## Technical Implementation

### Liveblocks Setup

```typescript
// Example configuration
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "your_public_key",
});

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useSelf,
  useOthers,
} = createRoomContext(client);
```

### Data Structure

```typescript
interface Document {
  id: string;
  content: string;
  type: "markdown" | "richtext" | "code";
  lastModified: Date;
  collaborators: {
    id: string;
    name: string;
    cursor?: {
      x: number;
      y: number;
    };
  }[];
}
```

## Future Considerations

1. **Persistence**

   - Document versioning
   - Auto-save functionality
   - Export/import capabilities

2. **Scalability**

   - User limits
   - Document size limits
   - Concurrent editing limits

3. **Security**
   - Document access control
   - Rate limiting
   - Input validation

## Conclusion

For the initial implementation, we recommend using Liveblocks due to its:

- Quick setup time
- Built-in features
- Free tier availability
- Excellent developer experience

This approach allows us to focus on frontend implementation while having a reliable real-time backend. The migration path to other solutions is well-documented if needed in the future.
