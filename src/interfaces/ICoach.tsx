export type ICoachType = {
  data?: {
      attributes?: {
      name?: string;
      previewText?: string;
      detailedDescription?: string;
      location?: string; 
      image?: {
        data?: {
          attributes?: {
            url?: string;
          };
        };
      };
    };
    id?: string;
  }
}; 