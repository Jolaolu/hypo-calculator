export interface IRatesResponse {
    meta: {
        key: string;
        serverTime: string;
        status: number;
    },
    data: {
        root: {
            ratesTable: Record<string, IFixationResponse>
        }
    }
}

export interface IUserResponse {
    query: {
        root: {
            rates_table: {
                property_price: number,
                repayment: number,
                loan_amount: number
                years_fixed: number []
            }
        }
    }
}

interface IFixationResponse {
    borrowingRate: number;
    monthlyRate: number;
}