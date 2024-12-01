const getFormattedDate = (date: Date) =>
    Intl.DateTimeFormat([], {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
    }).format(date);

export default getFormattedDate;
