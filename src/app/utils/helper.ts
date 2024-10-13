const getDurationInWeeks = (startDateStr: Date, endDateStr: Date) => {
  if (startDateStr && endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const durationInWeeks = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );

    return durationInWeeks > 0 ? durationInWeeks : false;
  } else {
    return false;
  }
};

export const helper = {
  getDurationInWeeks,
};
