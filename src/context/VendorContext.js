import React, {createContext, useState, useEffect, useRef} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {
    DeleteAuth,
    getAuth,
    getCommon,
    PatchAuth,
    patchFormdatatAuth,
    postAuth,
    postCommon,
    postFormdatatAuth,
    postGoogle,
    postUser,
    postUserLogout,
} from "../repository/Repo";
import {useNavigate} from "react-router-dom";
const VendorContext = createContext();
const VendorProvider = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingactivity, setloadingactivity] = useState(false);
    const [Products, setProducts] = useState([]);
    const [productCategory, setproductCategory] = useState([]);
    const [productSubCategory, setproductSubCategory] = useState([]);
    const [specificProduct, setspecificProduct] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [variantId, setvariantId] = useState();
    const [vendors, setvendors] = useState([]);
    const [vendorDetail, setvendorDetail] = useState("");
    const [toastMessage, settoastMessage] = useState("");
    const [images, setimages] = useState([]);
    const [users, setusers] = useState([]);
    const [drivers, setdrivers] = useState([]);
    const [userDetail, setuserDetail] = useState("");
    const [vendoritem, setvendoritem] = useState([]);
    const [orders, setorders] = useState([]);
    const [NearestVendor, setNearestVendor] = useState([]);
    const [requestProducts, setrequestProducts] = useState([]);
    const [statisticsData, setstatisticsData] = useState("");
    const AllProduct = async (page, categoryId, subCategoryId) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
                category_id: categoryId ? categoryId : "",
                sub_category_id: subCategoryId ? subCategoryId : "",
            };

            const res = await postAuth("admin/products/view", body);
            console.log(">>res..Product.", res);

            if (res?.data) {
                // dispatch({
                //     type: "SET_USER_DATA",
                //     payload: res?.data?.products,
                // });
                console.log(res?.data?.products);
                setProducts(res?.data?.products);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in ALLProduct....VEndorcontext", e);
        }
    };
    const ProductCategory = async () => {
        setloadingactivity(true);
        try {
            var body = {
                limit: 10,
                offset: 0,
            };

            const res = await postCommon("categories/", body);
            console.log(">>res..Category.", res);

            if (res?.data) {
                // dispatch({
                //     type: "SET_USER_DATA",
                //     payload: res?.data?.products,
                // });
                setproductCategory(res?.data?.categories);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in ProductCategory....VEndorcontext", e);
        }
    };
    const ProductSubCategory = async (id) => {
        setloadingactivity(true);
        try {
            var body = {
                limit: 30,
                offset: 0,
            };

            const res = await postCommon(`sub-categories/${id}/`, body);
            console.log(">>res..SubCategory.", res);

            if (res?.data) {
                // dispatch({
                //     type: "SET_USER_DATA",
                //     payload: res?.data?.products,
                // });
                setproductSubCategory(res?.data?.subcategories);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in ProductSubCategory....VEndorcontext", e);
        }
    };
    const getSpecificProduct = async (id) => {
        setloadingactivity(true);
        try {
            const res = await getCommon(`products/${id}/`);
            console.log(">>res..specificProduct.", res);

            if (res?.data) {
                // dispatch({
                //     type: "SET_USER_DATA",
                //     payload: res?.data?.products,
                // });
                setspecificProduct(res?.data);

                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in getSpecificProduct....VEndorcontext", e);
        }
    };

    const AddProduct = async (productDetails) => {
        const {
            name,
            description,
            brand,
            model,
            year,
            price,
            weight,
            discount,
            sku,
            color,
            size,
            dimensions,
            material,
            features,
            categoryId,
            subCategoryId,
            delivery_charge,
            delivery_time,
            driver_fees,
            mechanic_fees,
            images,
        } = productDetails;

        try {
            const formData = new FormData();

            // Add product details
            formData.append("name", name);
            formData.append("category_id", categoryId);
            formData.append("sub_category_id", subCategoryId);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("model", model);
            formData.append("year", year);
            formData.append("delivery_charge", delivery_charge);
            formData.append("delivery_time", delivery_time);
            formData.append("driver_fees", driver_fees);
            formData.append("mechanic_fees", mechanic_fees);

            // Add variant details
            const variantData = {
                price,
                discount,
                in_stock: true,
                sku,
                color,
                size,
                weight,
                dimensions,
                material,
                features,
            };
            formData.append("variant", JSON.stringify(variantData));

            // Add images
            if (images && images.length > 0) {
                images.forEach((item) => {
                    formData.append("images", item?.name);
                });
            }

            const res = await postFormdatatAuth("admin/products/add", formData);
            console.log(">>res..AddProduct.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
                setimages([]);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in AddProduct....VendorContext", e);
        }
    };

    const EditProduct = async (Id, productDetails) => {
        setloadingactivity(true);

        try {
            const body = {
                ...productDetails, // Spread productDetails to form the request body
            };
            console.log(">>body", body);

            const res = await PatchAuth(`admin/products/${Id}/edit`, body);
            console.log(">>res..EditProduct.", res);

            if (res?.data) {
                settoastMessage(res?.message);
            } else {
                settoastMessage(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            console.error("Error in EditProduct:", e);
        } finally {
            setloadingactivity(false);
        }
    };

    const VendorStock = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: offset,
            };

            const res = await postAuth("vendor/vendors/stock/list", body);
            console.log(">>res..vendor Stock.", res);

            if (res?.data) {
                // dispatch({
                //     type: "SET_USER_DATA",
                //     payload: res?.data?.products,
                // });
                setProducts(res?.data?.variants);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in VendorStock....VEndorcontext", e);
        }
    };
    const EditProfile = async (data) => {
        setloadingactivity(true);
        try {
            const formData = new FormData();

            // Add product details
            formData.append("first_name", data?.first_name);
            formData.append("last_name", data?.last_name);
            formData.append("email", data?.email);
            formData.append("phone_number", data?.phone_number);
            if (data.profile_image) {
                formData.append("profile_picture", data?.profile_image); // Add image only if it's present
            }

            const res = await patchFormdatatAuth("profile", formData);
            console.log(">>res..EditProfile.", res);

            if (res?.data) {
                AsyncStorage.setItem("@userdetails", JSON.stringify(res?.data.user));
                dispatch({
                    type: "SET_USER_DATA",
                    payload: res?.data?.user,
                });
                // console.log(res?.data);
                settoastMessage(res?.message);

                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                settoastMessage(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in EditProfile....VEndorcontext", e);
        }
    };
    const AllVendors = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
            };

            const res = await postAuth("admin/vendors/view", body);
            console.log(">>res..vendor.", res);

            if (res?.data) {
                // dispatch({
                //     type: "SET_USER_DATA",
                //     payload: res?.data?.products,
                // });
                console.log(res?.data);
                setvendors(res?.data?.vendor_profiles);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in ALLVendor....VEndorcontext", e);
        }
    };
    const AllUsers = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
                account_type: "customer",
            };

            const res = await postAuth("admin/users/view", body);
            console.log(">>res..users.", res);

            if (res?.data) {
                console.log(res?.data);
                setusers(res?.data?.users);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in ALLusers....VEndorcontext", e);
        }
    };
    const VendorProducts = async (page, id) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
            };

            const res = await postAuth(`vendors/stock/${id}/list`, body);
            console.log(">>res..VendorProducts.", res);

            if (res?.data) {
                console.log(res?.data);
                setvendoritem(res?.data?.variants);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in VendorProducts....VEndorcontext", e);
        }
    };
    const getSpecificVendor = async (id) => {
        setloadingactivity(true);
        try {
            const res = await getAuth(`vendor/vendors/${id}/view/`);
            console.log(">>res..specificVendor.", res);

            if (res?.data) {
                setvendorDetail(res?.data?.vendor);

                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in getSpecificvendor....VEndorcontext", e);
        }
    };

    const AllOrders = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
            };

            const res = await postAuth("admin/orders/view", body);
            console.log(">>res..AllOrders.", res);

            if (res?.data) {
                console.log(">>>>>>o", res?.data?.orders);
                setorders(res?.data?.orders);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in ALLorders....VEndorcontext", e);
        }
    };
    const updateProductStatus = async (Id, order_status, payment_status, vendor_payment_status) => {
        setloadingactivity(true);

        try {
            var body = {
                order_status,
                // payment_status,
                // vendor_payment_status: vendor_payment_status ? vendor_payment_status : "",
            };
            const res = await PatchAuth(`order-item/${Id}/update-status`, body);
            console.log(">>res..updateProductStatus.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                settoastMessage(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in updateProductStatus....VEndorcontext", e);
        }
    };
    const getNearestVendor = async (id) => {
        setloadingactivity(true);
        try {
            const res = await getAuth(`admin/order-item/${id}/find-nearest-vendors/`);
            console.log(">>res..getNearestVendor.", res);

            if (res?.data) {
                setNearestVendor(res?.data?.nearest_vendors);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in getNearestVendor....VEndorcontext", e);
        }
    };
    const assignVendor = async (order_item_id, vendor_id, vendor_selling_price) => {
        setloadingactivity(true);
        try {
            var body = {
                order_item_id,
                vendor_id,
                vendor_selling_price,
            };
            const res = await postAuth("admin/order-item/assign-vendor", body);
            console.log(">>res..assignVendor.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in assignVendor....VEndorcontext", e);
        }
    };
    const requestProductList = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
            };

            const res = await postAuth("admin/product-request/view", body);
            console.log(">>res..requestProductList.", res);

            if (res?.data) {
                setrequestProducts(res?.data?.product_requests);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in requestProductList....VEndorcontext", e);
        }
    };
    const updateProductRequest = async (Id, status) => {
        setloadingactivity(true);
        try {
            var body = {
                status,
            };
            const res = await PatchAuth(`product-request/${Id}/update`, body);
            console.log(">>res..updateProductRequest.", res);

            if (res?.data) {
                settoastMessage("Product has been Accepted");

                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                settoastMessage(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in updateProductRequest....VEndorcontext", e);
        }
    };
    const addSubCategory = async (category_id, name, description, image) => {
        setloadingactivity(true);
        try {
            const formData = new FormData();

            // Add product details
            formData.append("category_id", category_id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", image);
            const res = await postFormdatatAuth("admin/sub-categories/add", formData);
            console.log(">>res..addSubCategory.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in addSubCategory....VEndorcontext", e);
        }
    };
    const getAllSubCategory = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
            };

            const res = await postCommon("sub-categories/", body);
            console.log(">>res..getAllSubCategory.", res);

            if (res?.data) {
                setproductSubCategory(res?.data?.subcategories);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in getAllSubCategory....VEndorcontext", e);
        }
    };
    const editSubCategory = async (data) => {
        setloadingactivity(true);
        try {
            const formData = new FormData();

            formData.append("name", data.subCategoryName);
            formData.append("description", data.description);
            if (data.image) {
                formData.append("image", data.image); // Add image only if it's present
            }
            const res = await patchFormdatatAuth(`admin/sub-categories/${data.subCategoryId}/edit`, formData);
            console.log(">>res..editSubCategory.", res);

            if (res?.data) {
                settoastMessage(res?.message);

                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                settoastMessage(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in editSubCategory....VEndorcontext", e);
        }
    };
    const deleteCommon = async (uri) => {
        setloadingactivity(true);
        try {
            const res = await DeleteAuth(uri);
            console.log(">>res", res);
            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
                return res;
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in deleteCommon....VEndorcontext", e);
        }
    };
    const getStatistics = async () => {
        setloadingactivity(true);
        try {
            const res = await getAuth(`admin/statistics/`);
            console.log(">>res..getStatistics.", res);

            if (res?.data) {
                setstatisticsData(res?.data);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in getStatistics....VEndorcontext", e);
        }
    };
    const toggleProductStatus = async (id) => {
        setloadingactivity(true);
        try {
            const res = await getAuth(`admin/products/${id}/toggle-active/`);
            console.log(">>res..toggleProductStatus.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setstatisticsData(res?.data);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in toggleProductStatus....VEndorcontext", e);
        }
    };
    const AddVariant = async (Id, sku, price, discount, color, size, weight, dimensions, material, features) => {
        setloadingactivity(true);
        // console.log("details from addproduct>>", name, categoryId, description);
        try {
            const formData = new FormData();

            // Add product details

            const variantData = {
                price,
                discount,
                in_stock: false,
                sku,
                color,
                size,
                weight,
                dimensions,
                material,
                features,
            };
            formData.append("variant", JSON.stringify(variantData));
            // formData.append("images", images);
            if (images && images.length > 0) {
                images?.forEach((item) => {
                    formData.append("images", item);
                    console.log("imagessss", item);
                });
            }
            const res = await postFormdatatAuth(`admin/variant/${Id}/add`, formData);
            console.log(">>res..AddVariant.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
                setimages([]);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in AddVariant....VEndorcontext", e);
        }
    };
    const EditVariant = async (data) => {
        setloadingactivity(true);
        try {
            const formData = new FormData();
            console.log("imageedit", data?.images);
            // Add product details
            formData.append("sku", data?.sku);
            formData.append("price", data?.price);
            formData.append("discount", data?.discount);
            formData.append("in_stock", data?.stock_status);
            formData.append("color", data?.color);
            formData.append("size", data?.size);
            formData.append("weight", data?.weight);
            formData.append("dimensions", data?.dimensions);
            formData.append("material", data?.material);
            formData.append("features", data?.features);
            if (data?.images) {
                if (Array.isArray(data.images) && data.images.length > 0) {
                    data.images.forEach((item) => {
                        formData.append("images", item); // Append the file object itself
                    });
                }
            }
            const res = await patchFormdatatAuth(`admin/variant/${data.id}/edit`, formData);
            console.log(">>res..EditVariant.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
                setimages([]);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in EditVariant....VEndorcontext", e);
        }
    };
    const addDriver = async (
        first_name,
        last_name,
        email,
        phone_number,
        profile_picture,
        license_number,
        license_type,
        license_status,
        license_expiry_date,
        is_available,
        employment_status,
        address_line_1,
        address_line_2,
        city,
        state,
        postal_code,
        country,
        total_deliveries,
        rating,
        emergency_contact_phone
    ) => {
        setloadingactivity(true);
        try {
            const formData = new FormData();

            // Add product details
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("email", email);
            formData.append("phone_number", phone_number);
            formData.append("emergency_contact_phone", emergency_contact_phone);
            formData.append("profile_picture", profile_picture);
            formData.append("license_number", license_number);
            formData.append("license_type", license_type);
            formData.append("license_status", license_status);
            formData.append("license_expiry_date", license_expiry_date);
            formData.append("is_available", is_available);
            formData.append("employment_status", employment_status);
            formData.append("address_line_1", address_line_1);
            formData.append("address_line_2", address_line_2);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("postal_code", postal_code);
            formData.append("country", country);
            formData.append("total_deliveries", total_deliveries);
            formData.append("rating", rating);
            const res = await postFormdatatAuth("admin/driver/add", formData);
            console.log(">>res..addDriver.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in addDriver....VEndorcontext", e);
        }
    };
    const AllDrivers = async (page) => {
        setloadingactivity(true);
        try {
            const offset = (page - 1) * 10;

            var body = {
                limit: 10,
                offset: page ? offset : 0,
            };

            const res = await postAuth("admin/driver/view", body);
            console.log(">>res..drivers.", res);

            if (res?.data) {
                console.log(res?.data);
                setdrivers(res?.data?.drivers);
                setTotalCount(res?.data?.total_count);
                setPageCount(res?.data?.page_count);
                setHasNext(res?.data?.has_next);
                setCurrentPage(res?.data?.current_page);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in All Drivers....VEndorcontext", e);
        }
    };
    const assignDriver = async (order_id, driver_id) => {
        setloadingactivity(true);
        try {
            var body = {
                order_id,
                driver_id,
            };
            const res = await postAuth("admin/order/assign-driver", body);
            console.log(">>res..assignDriver.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in assignDriver....VEndorcontext", e);
        }
    };
    const EditDriver = async (data) => {
        setloadingactivity(true);
        try {
            const formData = new FormData();

            // Add product details
            formData.append("first_name", data?.first_name);
            formData.append("last_name", data?.last_name);
            formData.append("email", data?.email);
            formData.append("phone_number", data?.phone_number);
            formData.append("emergency_contact_phone", data?.emergency_contact_phone);
            formData.append("license_number", data?.license_number);
            formData.append("license_type", data?.license_type);
            formData.append("license_status", data?.license_status);
            formData.append("license_expiry_date", data?.license_expiry_date);
            formData.append("is_available", data?.is_available);
            formData.append("employment_status", data?.employment_status);
            formData.append("address_line_1", data?.address_line_1);
            formData.append("address_line_2", data?.address_line_2);
            formData.append("city", data?.city);
            formData.append("state", data?.state);
            formData.append("postal_code", data?.postal_code);
            formData.append("country", data?.country);
            formData.append("total_deliveries", data?.total_deliveries);
            formData.append("rating", data?.rating);
            if (data.profile_image) {
                formData.append("profile_picture", data?.profile_image); // Add image only if it's present
            }

            const res = await patchFormdatatAuth(`admin/driver/${data?.Id}/edit`, formData);
            console.log(">>res..EditDriver.", res);

            if (res?.data) {
                settoastMessage(res?.message);

                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                settoastMessage(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in EditDriver....VEndorcontext", e);
        }
    };
    const deleteDriver = async (driver_id) => {
        setloadingactivity(true);
        try {
            const res = await postAuth(`admin/driver/${driver_id}/delete`);
            console.log(">>res..deleteDriver.", res);

            if (res?.data) {
                settoastMessage(res?.message);
                setloadingactivity(false);
            } else {
                setloadingactivity(false);
                alert(res?.message);
                console.log(res?.message);
            }
        } catch (e) {
            setloadingactivity(false);
            console.log("errorr... in deleteDriver....VEndorcontext", e);
        }
    };
    return (
        <VendorContext.Provider
            value={{
                AllProduct,
                ProductCategory,
                ProductSubCategory,
                getSpecificProduct,
                AddProduct,
                setCurrentPage,
                VendorStock,
                EditProduct,
                EditProfile,
                currentPage,
                hasNext,
                pageCount,
                specificProduct,
                setspecificProduct,
                productSubCategory,
                Products,
                productCategory,
                setvariantId,
                variantId,
                vendors,
                settoastMessage,
                toastMessage,
                setimages,
                images,
                AllVendors,
                AllUsers,
                users,
                getSpecificVendor,
                vendorDetail,
                userDetail,
                setuserDetail,
                VendorProducts,
                vendoritem,
                updateProductStatus,
                AllOrders,
                getNearestVendor,
                NearestVendor,
                orders,
                assignVendor,
                requestProductList,
                requestProducts,
                updateProductRequest,
                addSubCategory,
                getAllSubCategory,
                editSubCategory,
                deleteCommon,
                getStatistics,
                statisticsData,
                toggleProductStatus,
                AddVariant,
                EditVariant,
                addDriver,
                AllDrivers,
                drivers,
                assignDriver,
                EditDriver,
                deleteDriver,
            }}
        >
            {children}
        </VendorContext.Provider>
    );
};

export {VendorProvider, VendorContext};
