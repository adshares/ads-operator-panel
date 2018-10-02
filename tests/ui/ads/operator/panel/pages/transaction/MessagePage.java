package ui.ads.operator.panel.pages.transaction;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class MessagePage {

//  Assert
  @FindBy(xpath = "//*[contains(text(), 'Id')]")                                                                        private WebElement IdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Node Id')]")                                                                   private WebElement NodeIdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Block Id')]")                                                                  private WebElement BlockIdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Transactions')]")                                                              private WebElement TransactionsAssert;
  @FindBy(xpath = "//*[contains(text(), 'Length')]")                                                                    private WebElement LengthAssert;
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
  @FindBy(xpath = "//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")                     private WebElement ThreeDots;
  @FindBy(xpath = "//section//thead//th[1]")                                                                            private WebElement NodesId;
  @FindBy(xpath = "//section//thead//th[2]")                                                                            private WebElement Block;
  @FindBy(xpath = "//section//thead//th[7]")                                                                            private WebElement Type;
  //  Accounts
  @FindBy(xpath = "//section//th[1]")                                                                                   private WebElement AccountIdAssert;
  @FindBy(xpath = "//section//th[2]")                                                                                   private WebElement AccountBalanceAssert;
  @FindBy(xpath = "//section//th[3]")                                                                                   private WebElement AccountStatusAssert;
  @FindBy(xpath = "//section//th[4]")                                                                                   private WebElement AccountPublicKeyAssert;


  private WebDriver driver;
  private WebDriverWait wait;

  public MessagePage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 30);
    PageFactory.initElements(driver, this);
  }

  public void detailedDataMessage () {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.print("Assert - Id, ");
    wait.until(ExpectedConditions.visibilityOf(NodeIdAssert));
    Assert.assertEquals("Node Id", NodeIdAssert.getText());
    System.out.print("Node Id, ");
    wait.until(ExpectedConditions.visibilityOf(BlockIdAssert));
    Assert.assertEquals("Block Id", BlockIdAssert.getText());
    System.out.print("Block Id, ");
    wait.until(ExpectedConditions.visibilityOf(TransactionsAssert));
    Assert.assertEquals("Transactions", TransactionsAssert.getText());
    System.out.print("Transactions, ");
    wait.until(ExpectedConditions.visibilityOf(LengthAssert));
    Assert.assertEquals("Length", LengthAssert.getText());
    System.out.println("Length");
    copyCode();
  }

  public void  searchMessageNoPosition () {
    wait.until(ExpectedConditions.visibilityOf(FailedToFetchAssert));
    Assert.assertEquals("Failed to fetch", FailedToFetchAssert.getText());
    System.out.println("Assert - Failed to fetch");
  }

  public void sortingMessages() {
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
    String url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(Next));
    Next.click();
    url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(Previous));
    Previous.click();
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


  public void sortingTransactionsInMessage() {
    if(!driver.findElements(By.xpath("//*[contains(@href,'sort=id&order=desc')]")).isEmpty()){
      wait.until(ExpectedConditions.visibilityOf(NodesId));
      NodesId.click();
    }else{
      System.out.println("Skip >>>>> Click - NodeId");
    }
    System.out.println(driver.getCurrentUrl());
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    System.out.println(driver.getCurrentUrl());
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    System.out.println(driver.getCurrentUrl());
  }

}
