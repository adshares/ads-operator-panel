package ui.ads.operator.panel.pages.transaction;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class ToPage {

//  Assert
  @FindBy(xpath = "//*[contains(text(), 'Id')]")                                                                        private WebElement IdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Balance')]")                                                                   private WebElement BalanceAssert;
  @FindBy(xpath = "//*[contains(text(), 'Status')]")                                                                    private WebElement StatusAssert;
  @FindBy(xpath = "//*[contains(text(), 'Public Key')]")                                                                private WebElement PublicKeyAssert;
  @FindBy(xpath = "//*[contains(text(), 'Last Active Time')]")                                                          private WebElement LastActiveTimeAssert;
  @FindBy(xpath = "//tr[6]//span")                                                                                      private WebElement TimeAssert;
  @FindBy(xpath = "//li[6]//span//span")                                                                                private WebElement TimeAssert2;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=desc')]")                                                          private WebElement SortIdOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=asc')]")                                                           private WebElement SortIdOrderAscAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=block_id&order=desc')]")                                                    private WebElement SortBlockOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=block_id&order=asc')]")                                                     private WebElement SortBlockOrderAscAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=type&order=desc')]")                                                        private WebElement SortTypeOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=type&order=asc')]")                                                         private WebElement SortTypeOrderAscAssert;
  @FindBy(xpath = "//*[contains(text(), 'Failed to fetch')]")                                                           private WebElement FailedToFetchAssert;
  //Button
  @FindBy(xpath = "//*[contains(text(), 'Table')]")                                                                     private WebElement Table;
  @FindBy(xpath = "//*[contains(text(), 'Code')]")                                                                      private WebElement Code;
  @FindBy(xpath = "//section//div[2]//button")                                                                          private WebElement Copy;
  @FindBy(xpath = "//*[contains(text(), 'Previous')]")                                                                  private WebElement Previous;
  @FindBy(xpath = "//*[contains(text(), 'Next')]")                                                                      private WebElement Next;
  @FindBy(xpath = "//*[contains(text(), '...')]")                                                                       private WebElement ThreeDots;
  @FindBy(xpath = "//section//thead//th//span[contains(text(), 'Id')]")                                                 private WebElement NodesId;
  @FindBy(xpath = "//section//thead//th//span[contains(text(), 'Block')]")                                              private WebElement Block;
  @FindBy(xpath = "//section//thead//th//span[contains(text(), 'Type')]")                                               private WebElement Type;
  //  Accounts
  @FindBy(xpath = "//section//th//span[contains(text(), 'Account Id')]")                                                private WebElement AccountIdAssert;
  @FindBy(xpath = "//section//th//span[contains(text(), 'Balance')]")                                                   private WebElement AccountBalanceAssert;
  @FindBy(xpath = "//section//th//span[contains(text(), 'Status')]")                                                    private WebElement AccountStatusAssert;
  @FindBy(xpath = "//section//th//span[contains(text(), 'Public Key')]")                                                private WebElement AccountPublicKeyAssert;


  private WebDriver driver;
  private WebDriverWait wait;

  public ToPage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 30);
    PageFactory.initElements(driver, this);
  }

  public void detailedDataTo () {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.print("Assert - Id, ");
    wait.until(ExpectedConditions.visibilityOf(BalanceAssert));
    Assert.assertEquals("Balance", BalanceAssert.getText());
    System.out.print("Balance, ");
    wait.until(ExpectedConditions.visibilityOf(StatusAssert));
    Assert.assertEquals("Status", StatusAssert.getText());
    System.out.print("Status, ");
    wait.until(ExpectedConditions.visibilityOf(PublicKeyAssert));
    Assert.assertEquals("Public Key", PublicKeyAssert.getText());
    System.out.print("Public Key, ");
    wait.until(ExpectedConditions.visibilityOf(LastActiveTimeAssert));
    Assert.assertEquals("Last Active Time", LastActiveTimeAssert.getText());
    System.out.print("Last Active Time, ");
    if(!driver.findElements(By.xpath("//tr[6]//span")).isEmpty()){
      wait.until(ExpectedConditions.visibilityOf(TimeAssert));
      Assert.assertEquals("Time", TimeAssert.getText());
    }else{
      wait.until(ExpectedConditions.visibilityOf(TimeAssert2));
      Assert.assertEquals("Time", TimeAssert2.getText());
    }
    System.out.println("Time");
    copyCode();
  }

  public void  searchFromNoPosition () {
    wait.until(ExpectedConditions.visibilityOf(FailedToFetchAssert));
    Assert.assertEquals("Failed to fetch", FailedToFetchAssert.getText());
    System.out.println("Assert - Failed to fetch");

    copyCode();
  }

  public void sortingTransactionsInAccount() {
    wait.until(ExpectedConditions.visibilityOf(SortBlockOrderAscAssert));
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    System.out.println("Assert 1 - SortIdOrderDesc");
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    System.out.println("Assert 2 - SortIdOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortBlockOrderAscAssert));
    System.out.println("Assert 3 - SortBlockOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(Block));
    Block.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortBlockOrderDescAssert));
    System.out.println("Assert 4 - SortBlockOrderDesc");
    wait.until(ExpectedConditions.visibilityOf(Block));
    Block.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortTypeOrderDescAssert));
    System.out.println("Assert 5 - SortTypeOrderDesc");
    wait.until(ExpectedConditions.visibilityOf(Type));
    Type.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortTypeOrderAscAssert));
    System.out.println("Assert 6 - SortTypeOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(Type));
    Type.click();
    nextPrevious();

  }
  private void nextPrevious() {
  if(!driver.findElements(By.xpath("//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")).isEmpty()){
    System.out.println("---------- next page ----------");
    String url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(Previous));
    wait.until(ExpectedConditions.visibilityOf(Next));
    Next.click();
    url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(Previous));
    wait.until(ExpectedConditions.visibilityOf(Next));
    Previous.click();
  }else{
    String url=driver.getCurrentUrl();
    System.out.println(url);
    System.out.println("---------- no page ----------");
    System.out.println("Skip >>>>>");
  }
  }

  private void copyCode() {
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
  }

}
