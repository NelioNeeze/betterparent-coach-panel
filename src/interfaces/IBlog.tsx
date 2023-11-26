export type IBlogType = {
  data?: {
    attributes?: {
      title?: string;
      summary?: string;
      text?: string;
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