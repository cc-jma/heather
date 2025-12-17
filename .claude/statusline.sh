#!/bin/bash

input=$(cat)

# Extract data from JSON
MODEL=$(echo "$input" | jq -r '.model.display_name // "Claude"')
CURRENT_DIR=$(echo "$input" | jq -r '.workspace.current_dir // ""')
COST=$(echo "$input" | jq -r '.cost.total_cost_usd // "0"')

# Get directory name
DIR_NAME="${CURRENT_DIR##*/}"
if [ -z "$DIR_NAME" ]; then
    DIR_NAME="~"
fi

# Get git branch
GIT_BRANCH=""
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current 2>/dev/null)
    if [ -n "$BRANCH" ]; then
        GIT_BRANCH=" ⎇ $BRANCH"
    fi
fi

# Calculate context usage percentage
CONTEXT_DISPLAY=""
CONTEXT_SIZE=$(echo "$input" | jq -r '.context_window.context_window_size // 0')
if [ "$CONTEXT_SIZE" -gt 0 ]; then
    INPUT_TOKENS=$(echo "$input" | jq -r '.context_window.current_usage.input_tokens // 0')
    CACHE_CREATE=$(echo "$input" | jq -r '.context_window.current_usage.cache_creation_input_tokens // 0')
    CACHE_READ=$(echo "$input" | jq -r '.context_window.current_usage.cache_read_input_tokens // 0')

    CURRENT_TOKENS=$((INPUT_TOKENS + CACHE_CREATE + CACHE_READ))

    if [ "$CURRENT_TOKENS" -gt 0 ]; then
        PERCENT_USED=$((CURRENT_TOKENS * 100 / CONTEXT_SIZE))

        # Choose emoji based on usage
        if [ $PERCENT_USED -lt 30 ]; then
            CONTEXT_EMOJI="🟢"
        elif [ $PERCENT_USED -lt 70 ]; then
            CONTEXT_EMOJI="🟡"
        else
            CONTEXT_EMOJI="🔴"
        fi
        CONTEXT_DISPLAY=" | $CONTEXT_EMOJI ${PERCENT_USED}%"
    fi
fi

# Format cost
COST_DISPLAY=""
if [ "$COST" != "0" ] && [ "$COST" != "null" ]; then
    # Format to 4 decimal places
    COST_FORMATTED=$(printf "%.4f" "$COST")
    COST_DISPLAY=" | 💰 \$$COST_FORMATTED"
fi

# Output status line
echo "[$MODEL] 📁 $DIR_NAME$GIT_BRANCH$CONTEXT_DISPLAY$COST_DISPLAY"
