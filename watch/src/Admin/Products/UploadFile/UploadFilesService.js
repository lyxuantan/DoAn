import HTTP from "../../../api/http-common";
class UploadFilesService {
    upload(file, productId, isPresident, onUploadProgress) {
        console.log(file, productId, isPresident,)
        let formData = new FormData();
        formData.append("file", file);
        formData.append("productId", productId);
        formData.append("isPresident", isPresident);
        return HTTP.post("admin/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }
    // getFiles() {
    //     return HTTP.get("/files");
    // }
}
export default new UploadFilesService();