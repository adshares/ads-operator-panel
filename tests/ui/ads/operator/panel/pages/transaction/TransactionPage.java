package ui.ads.operator.panel.pages.transaction;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class TransactionPage {

//  Assert
  @FindBy(xpath = "//*[contains(text(), 'Id')]")                                                                        private WebElement IdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Block Id')]")                                                                  private WebElement BlockIdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Message Id')]")                                                                private WebElement MessageIdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Sender Address')]")                                                            private WebElement SenderAddressAssert;
  @FindBy(xpath = "//*[contains(text(), 'Target Address')]")                                                            private WebElement TargetAddressAssert;
  @FindBy(xpath = "//*[contains(text(), 'Amount')]")                                                                    private WebElement AmountAssert;
  @FindBy(xpath = "//*[contains(text(), 'Sender Fee')]")                                                                private WebElement SenderFeeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Size')]")                                                                      private WebElement SizeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Type')]")                                                                      private WebElement TypeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Time')]")                                                                      private WebElement TimeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Failed to fetch')]")                                                           private WebElement FailedToFetchAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=desc')]")                                                          private WebElement SortIdOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=asc')]")                                                           private WebElement SortIdOrderAscAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=block_id&order=desc')]")                                                    private WebElement SortBlockOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=block_id&order=asc')]")                                                     private WebElement SortBlockOrderAscAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=type&order=desc')]")                                                        private WebElement SortTypeOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=type&order=asc')]")                                                         private WebElement SortTypeOrderAscAssert;
  //Button
  @FindBy(xpath = "//*[contains(text(), 'Table')]")                                                                     private WebElement Table;
  @FindBy(xpath = "//*[contains(text(), 'Code')]")                                                                      private WebElement Code;
  @FindBy(xpath = "//section//div[2]//button")                                                                          private WebElement Copy;
  @FindBy(xpath = "//*[contains(text(), 'Previous')]")                                                                  private WebElement Previous;
  @FindBy(xpath = "//*[contains(text(), 'Next')]")                                                                      private WebElement Next;
//  @FindBy(xpath = "//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")                     private WebElement ThreeDots;
  @FindBy(xpath = "//*[@class='pagination justify-content-center flex-wrap']//descendant::span[contains(text(), '...')]") private WebElement ThreeDots;
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

  public TransactionPage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 60);
    PageFactory.initElements(driver, this);
  }

  public void detailedDataTransaction () {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.print("Assert - Id, ");
    wait.until(ExpectedConditions.visibilityOf(BlockIdAssert));
    Assert.assertEquals("Block Id", BlockIdAssert.getText());
    System.out.print("Block Id, ");
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    Assert.assertEquals("Message Id", MessageIdAssert.getText());
    System.out.print("Message Id, ");
    wait.until(ExpectedConditions.visibilityOf(SenderAddressAssert));
    Assert.assertEquals("Sender Address", SenderAddressAssert.getText());
    System.out.print("Sender Address, ");
    wait.until(ExpectedConditions.visibilityOf(TargetAddressAssert));
    Assert.assertEquals("Target Address", TargetAddressAssert.getText());
    System.out.print("Target Address, ");
    wait.until(ExpectedConditions.visibilityOf(AmountAssert));
    Assert.assertEquals("Amount", AmountAssert.getText());
    System.out.print("Amount, ");
    wait.until(ExpectedConditions.visibilityOf(SenderFeeAssert));
    Assert.assertEquals("Sender Fee", SenderFeeAssert.getText());
    System.out.print("Sender Fee, ");
    wait.until(ExpectedConditions.visibilityOf(SizeAssert));
    Assert.assertEquals("Size", SizeAssert.getText());
    System.out.print("Size, ");
    wait.until(ExpectedConditions.visibilityOf(TypeAssert));
    Assert.assertEquals("Type", TypeAssert.getText());
    System.out.print("Type, ");
    wait.until(ExpectedConditions.visibilityOf(TimeAssert));
    Assert.assertEquals("Time", TimeAssert.getText());
    System.out.print("Time");

    copyCode();
  }

  public void  searchTransactionNoPosition () {
    wait.until(ExpectedConditions.visibilityOf(FailedToFetchAssert));
    Assert.assertEquals("Failed to fetch", FailedToFetchAssert.getText());
    System.out.println("Assert - Failed to fetch");
  }

  public void sortingTransactions() {
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
      System.out.println("---------- nextPrevious ----------");
      String url=driver.getCurrentUrl();
      System.out.println(url);
      wait.until(ExpectedConditions.visibilityOf(IdAssert));
      wait.until(ExpectedConditions.visibilityOf(Previous));
      wait.until(ExpectedConditions.visibilityOf(ThreeDots));
      wait.until(ExpectedConditions.visibilityOf(Next));
      Next.click();
      url=driver.getCurrentUrl();
      System.out.println(url);
      if(!driver.findElements(By.xpath("//*[@class='pagination justify-content-center flex-wrap']//descendant::span[2]")).isEmpty()){
        wait.until(ExpectedConditions.visibilityOf(IdAssert));
        wait.until(ExpectedConditions.visibilityOf(Previous));
        wait.until(ExpectedConditions.visibilityOf(ThreeDots));
        wait.until(ExpectedConditions.visibilityOf(Next));
        Next.click();
        url=driver.getCurrentUrl();
        System.out.println(url);
        wait.until(ExpectedConditions.visibilityOf(IdAssert));
        wait.until(ExpectedConditions.visibilityOf(Next));
        wait.until(ExpectedConditions.visibilityOf(Previous));
        Previous.click();
      }else{
        System.out.println(url);
        System.out.println("Skip >>>>> no page 3");
      }
      wait.until(ExpectedConditions.visibilityOf(IdAssert));
      wait.until(ExpectedConditions.visibilityOf(Next));
      wait.until(ExpectedConditions.visibilityOf(Previous));
      Previous.click();
    }else{
      String url=driver.getCurrentUrl();
      System.out.println(url);
      System.out.println("Skip >>>>> no page 2");
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
