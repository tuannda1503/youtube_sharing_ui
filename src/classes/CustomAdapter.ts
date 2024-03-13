export class UploadAdapter {
    private loader;
    private linkUrl;
    xhr: any;
    constructor(loader: any, linkUrl: string) {
        this.loader = loader;
        this.linkUrl = linkUrl;
    }

    upload() {
        return this.loader.file.then(
            (file: any) =>
                new Promise((resolve, reject) => {
                    this._initRequest();
                    this._initListeners(resolve, reject, file);
                    this._sendRequest(file);
                })
        );
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = (this.xhr = new XMLHttpRequest());
        const token = `Bearer ${localStorage.getItem("accessToken")}`;
        xhr.open("POST", this.linkUrl, true);
        xhr.responseType = "json";
        xhr.setRequestHeader("Authorization", token);
    }

    _initListeners(resolve: any, reject: any, file: any) {
        const xhr = this.xhr;
        const loader = this.loader;
        const errorText =
            "Your image could not be uploaded. Images should be less than or equal to 7 MB and saved as PNG, JPG, JPEG files";

        xhr.addEventListener("error", () => reject(errorText));
        xhr.addEventListener("abort", () => reject());
        xhr.addEventListener("load", () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : errorText);
            }
            resolve({
                default: `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${response.path}`,
            });

            if (xhr.upload) {
                xhr.upload.addEventListener("progress", (evt: any) => {
                    if (evt.lengthComputable) {
                        loader.uploadTotal = evt.total;
                        loader.uploaded = evt.loaded;
                    }
                });
            }
        });
    }

    _sendRequest(file: any) {
        const data = new FormData();
        data.append("image", file);
        this.xhr.send(data);
    }
}
