import { useEffect, useState } from "react";

import {
    getTableByToken,
    checkActiveOrder
} from "./services";

export function useTable(token) {

    const [table, setTable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasActiveOrder, setHasActiveOrder] = useState(false);

    useEffect(() => {

        async function load() {

            try {

                const tableData =
                    await getTableByToken(token);

                setTable(tableData);

                const active =
                    await checkActiveOrder(
                        tableData.number
                    );

                setHasActiveOrder(active);

            } catch (error) {

                console.error(error);
                setTable(null);

            } finally {

                setLoading(false);
            }
        }

        load();

    }, [token]);

    return {
        table,
        loading,
        hasActiveOrder
    };
}