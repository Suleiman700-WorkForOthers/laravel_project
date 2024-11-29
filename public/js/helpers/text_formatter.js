
/**
 * Format call duration
 * @param {string} _duration - E.g. "00:30:00"
 * @returns {string}
 */
export const callDurationFormatter = (_duration) => {
    const [hours, minutes, seconds] = _duration.split(':');

    // Show only relevant values
    const showHours = hours > 0;
    const showMinutes = minutes > 0;
    const showSeconds = seconds > 0;

    // Build the string
    let result = '';
    if (showHours) result += `${hours}h `;
    if (showMinutes) result += `${minutes}m `;
    if (showSeconds) result += `${seconds}s`;

    return result;
}
