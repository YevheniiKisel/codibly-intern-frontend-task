// Interface which represents a structure of fetched data from endpoint
export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

// Interface which represents type of error global state
export interface ErrorState {
  errorMessage:string | null;
}

//Interface which represent type of modal global state
export interface ModalState {
  modalIsOpen: boolean;
  modalData: Product | undefined;
}