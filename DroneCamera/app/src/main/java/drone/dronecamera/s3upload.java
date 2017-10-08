package drone.dronecamera;

import android.content.Context;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.services.s3.AmazonS3Client;

import java.io.File;

/**
 * Created by rgiometti on 10/8/17.
 */
public class s3upload {

    AmazonS3Client s3;
    BasicAWSCredentials credentials;
    TransferUtility transferUtility;


    String key = "AKIAJ5V3PIXKXLU7ONNQ";
    String secret = "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";
    String bucketName = "dronebucketcalhacks";

    s3upload(Context context){
        credentials = new BasicAWSCredentials(key,secret);
        s3 = new AmazonS3Client(credentials);
        transferUtility = new TransferUtility(s3, context);
    }

    void upload(File file){
        transferUtility.upload(
                bucketName,
                "file_".concat((new java.util.Date()).toString()),
                file
        );

    }




}
