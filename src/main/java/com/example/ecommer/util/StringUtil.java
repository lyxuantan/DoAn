package com.example.ecommer.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class StringUtil {
  private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
  private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
  private String str;

  public StringUtil() {
  }

  public StringUtil(String str) {
    this.str = str;
  }

  public String getStr() {
    return str;
  }

  public void setStr(String str) {
    this.str = str;
  }

  public String toSlug() {
    String noWhiteSpace = WHITESPACE.matcher(str).replaceAll("-");
    String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
    String slug = NON_LATIN.matcher(normalized).replaceAll("");
    return slug.toLowerCase(Locale.ENGLISH);
  }

  // function to generate a random string of length n

  public String getAlphaNumericString(int n) {

    // chose a Character random from this String
    String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      + "0123456789"
      + "abcdefghijklmnopqrstuvxyz";

    // create StringBuffer size of AlphaNumericString
    StringBuilder sb = new StringBuilder(n);

    for (int i = 0; i < n; i++) {

      // generate a random number between
      // 0 to AlphaNumericString variable length
      int index
        = (int) (AlphaNumericString.length()
        * Math.random());

      // add Character one by one in end of sb
      sb.append(AlphaNumericString
        .charAt(index));
    }

    return sb.toString();
  }
}
