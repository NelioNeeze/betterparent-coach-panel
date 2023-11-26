export type ICourseType = {
  data?: {
    attributes?: {
      title?: string;
      shortDescription?: string;
      detailedText?: string;
      ageStart?: number;
      ageEnd?: number;
      coach?: string; 
      category?: {
        data?: {
          attributes?: {
            name?: string;
          };
        };
      };
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