import { ReviewsResponse } from "./types/reviews";

const reviewsPath = "https://streams.yext.com/v2/accounts/me/api/fetchReviews";

export const fetchReviewsFromYext = async (
  entityId: string,
  pageToken?: string,
  limit?: number,
  sort?: string,
  rating?: number
): Promise<ReviewsResponse> => {
  let requestString = `${reviewsPath}?api_key=${
    import.meta.env.YEXT_PUBLIC_REVIEWS_API_KEY
  }&v=20221114&entity.id=${entityId}`;
  if (pageToken) {
    requestString += `&pageToken=${pageToken}`;
  }
  if (limit) {
    requestString += `&limit=${limit}`;
  }
  if (sort) {
    requestString += `&sort=${sort}`;
  }
  if (rating) {
    requestString += `&rating=${rating}`;
  }

  try {
    const resp = await fetch(requestString);
    const reviewsResponse = await resp.json();
    return reviewsResponse.response;
  } catch (e) {
    return Promise.reject(e);
  }
};
