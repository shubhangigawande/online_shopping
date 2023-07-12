
var productImagePath = '';
var readProductDetails = () => {

        var productData = {}
        productData.productId = $("#productId").val();
        productData.category = $("#productCategory").val();
        productData.name = $("#productName").val();
        productData.price = $("#productPrice").val();
        productData.manufacturer = $("#productManu").val();
        productData.seller = $("#productSeller").val();
        productData.image = productImagePath;
        productData.rating = $("#productRating").val();

        console.log(productData);

        var apiEndPoint = '/new/addProduct';
        axios.post(apiEndPoint, productData).then((response) => {
          console.log(response);
        }).catch((error) => {
    })
}

var uploadProductImage = () => {
  console.log($("input[name=prodImage]"))

  let uploadfile = $("input[name=prodImage]")[0].files[0]
  let formData = new FormData();
  formData.append("prodImage", uploadfile);

  var imageUploadReq = $.ajax({
    url: '/upload/productImage',
    type: 'POST',
    data: formData,
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    dataType: 'JSON'
  });

  imageUploadReq.done((response) =>{
    console.log("upload doness")
    productImagePath = response.file_path;
  })
}