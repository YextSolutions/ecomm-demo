import * as React from "react";
import { createContext, Dispatch, useReducer, ReactNode } from "react";
import { fetchReviewsFromYext } from "../../api";
import { Review } from "../../types/reviews";
import { ProviderProps } from "./AppProvider";

// state
interface ReviewsState {
  entityId: string;
  reviews: Review[];
  loading: boolean;
  error: boolean;
  nextPageToken?: string;
  count: number;
  ratingFilter?: number;
  // ratingCount: {
  //   oneStar: number;
  //   twoStar: number;
  //   threeStar: number;
  //   fourStar: number;
  //   fiveStar: number;
  // };
  limit?: number;
  sort?: string;
  pageCount: number;
}

const initialState: ReviewsState = {
  entityId: "",
  reviews: [],
  loading: false,
  error: false,
  nextPageToken: undefined,
  count: 0,
  // ratingCount: {
  //   oneStar: 0,
  //   twoStar: 0,
  //   threeStar: 0,
  //   fourStar: 0,
  //   fiveStar: 0,
  // },
  limit: 10,
  pageCount: 0,
};

//actions
export enum ReviewsActionTypes {
  FetchedReviews,
  FetchingReviews,
}

export interface FetchReviews {
  type: ReviewsActionTypes.FetchedReviews;
  payload: {
    entityId: string;
    limit: number;
    sort?: string;
    ratingFilter?: number;
    nextPageToken?: string;
    reviews: Review[];
    count: number;
  };
}

export interface FetchingReviews {
  type: ReviewsActionTypes.FetchingReviews;
}

export type ReviewsActions = FetchReviews | FetchingReviews;

export const fetchReviews = async (
  dispatch: Dispatch<ReviewsActions>,
  entityId: string,
  limit = 10,
  sort?: string,
  rating?: number
) => {
  dispatch({ type: ReviewsActionTypes.FetchingReviews });

  const response = await fetchReviewsFromYext(
    entityId,
    undefined,
    limit,
    sort,
    rating
  );

  if (response) {
    dispatch({
      type: ReviewsActionTypes.FetchedReviews,
      payload: {
        entityId,
        limit,
        sort,
        ratingFilter: rating,
        nextPageToken: response.nextPageToken,
        reviews: response.docs,
        count: response.count,
      },
    });
  }
};

// reducer
const reviewsReducer = (state: ReviewsState, action: ReviewsActions) => {
  switch (action.type) {
    case ReviewsActionTypes.FetchingReviews:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReviewsActionTypes.FetchedReviews:
      return {
        ...state,
        loading: false,
        error: false,
        reviews: action.payload.reviews,
        count: action.payload.count,
        nextPageToken: action.payload.nextPageToken,
        limit: action.payload.limit,
        sort: action.payload.sort,
        ratingFilter: action.payload.ratingFilter,
        pageCount: Math.ceil(action.payload.count / action.payload.limit),
      };
    default:
      return state;
  }
};

export const ReviewsContext = createContext<{
  reviewsState: ReviewsState;
  dispatch: Dispatch<ReviewsActions>;
}>({
  reviewsState: initialState,
  dispatch: () => null,
});

const ReviewsProvider = ({ children }: ProviderProps): JSX.Element => {
  const [reviewsState, dispatch] = useReducer(reviewsReducer, initialState);
  return (
    <ReviewsContext.Provider value={{ reviewsState, dispatch }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
