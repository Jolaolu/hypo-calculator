import type { IRatesResponse } from "./index.model"


export const rateResponse: IRatesResponse = {
    "meta": {
        "serverTime": "2023-01-18T16:37:52+00:00",
        "status": 0,
        "key": "OK"
    },
    "data": {
        "root": {
            "ratesTable": {
                "5": {
                    "borrowingRate": 3.76,
                    "monthlyRate": 1515.18
                },
                "10": {
                    "borrowingRate": 3.71,
                    "monthlyRate": 1502.03
                },
                "15": {
                    "borrowingRate": 3.86,
                    "monthlyRate": 1541.49
                },
                "20": {
                    "borrowingRate": 3.95,
                    "monthlyRate": 1565.16
                },
                "25": {
                    "borrowingRate": 4.22,
                    "monthlyRate": 1636.19
                },
                "30": {
                    "borrowingRate": 4.57,
                    "monthlyRate": 1728.26
                }
            }
        }
    }
}