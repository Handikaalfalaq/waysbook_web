package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"

	// "gopkg.in/gographics/imagick.v3/imagick"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		pdf, err := c.FormFile("pdf")

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		src, err := pdf.Open()

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		defer src.Close()

		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")

		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
		respPdf, err := cld.Upload.Upload(ctx, src, uploader.UploadParams{Folder: "waysbook"})

		if err != nil {
			fmt.Println(err.Error())
		}

		image, err := c.FormFile("image")

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		srcImage, err := image.Open()

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		defer srcImage.Close()

		dataImage, err := cld.Upload.Upload(ctx, srcImage, uploader.UploadParams{Folder: "waysbook"})

		if err != nil {
			fmt.Println(err.Error())
		}

		c.Set("dataPdf", respPdf.SecureURL)
		c.Set("dataImage", dataImage.SecureURL)

		return next(c)
	}
}

func UploadfotoProfile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		profile, err := c.FormFile("image")

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		srcProfile, err := profile.Open()

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		defer srcProfile.Close()

		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")

		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
		respProfile, err := cld.Upload.Upload(ctx, srcProfile, uploader.UploadParams{Folder: "waysbook"})

		if err != nil {
			fmt.Println(err.Error())
		}

		c.Set("dataImageProfile", respProfile.SecureURL)

		return next(c)
	}
}
