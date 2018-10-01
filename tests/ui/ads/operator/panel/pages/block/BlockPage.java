package ui.ads.operator.panel.pages.block;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class BlockPage {
  //  Assert
  @FindBy(xpath = "//*[contains(text(), 'Id')]")                                                                        private WebElement IdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Messages')]")                                                                  private WebElement MessagesAssert;
  @FindBy(xpath = "//*[contains(text(), 'Nodes')]")                                                                     private WebElement NodesAssert;
  @FindBy(xpath = "//*[contains(text(), 'Transactions')]")                                                              private WebElement TransactionsAssert;
  @FindBy(xpath = "//*[contains(text(), 'Dividend Balance')]")                                                          private WebElement DividendBalanceAssert;
  @FindBy(xpath = "//*[contains(text(), 'Dividend Pay')]")                                                              private WebElement DividendPayAssert;
  @FindBy(xpath = "//*[contains(text(), 'Old Hash')]")                                                                  private WebElement OldHashAssert;
  @FindBy(xpath = "//*[contains(text(), 'Now Hash')]")                                                                  private WebElement NowHashAssert;
  @FindBy(xpath = "//*[contains(text(), 'Msg Hash')]")                                                                  private WebElement MsgHashAssert;
  @FindBy(xpath = "//*[contains(text(), 'Vip Hash')]")                                                                  private WebElement VipHashAssert;
  @FindBy(xpath = "//*[contains(text(), 'Time')]")                                                                      private WebElement TimeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Failed to fetch')]")                                                           private WebElement FailedToFetchAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=desc')]")                                                          private WebElement SortIdOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=asc')]")                                                           private WebElement SortIdOrderAscAssert;
  //Button
  @FindBy(xpath = "//*[contains(text(), 'Table')]")                                                                     private WebElement Table;
  @FindBy(xpath = "//*[contains(text(), 'Code')]")                                                                      private WebElement Code;
  @FindBy(xpath = "//section//div[2]//button")                                                                          private WebElement Copy;
  @FindBy(xpath = "//*[contains(text(), 'Previous')]")                                                                  private WebElement Previous;
  @FindBy(xpath = "//*[contains(text(), 'Next')]")                                                                      private WebElement Next;
  //  Message
  @FindBy(xpath = "//section//thead//th[1]//span")                                                                      private WebElement MessageIdAssert;
  @FindBy(xpath = "//section//thead//th[2]//span")                                                                      private WebElement MessageNodeIdAssert;
  @FindBy(xpath = "//section//thead//th[3]//span")                                                                      private WebElement MessageTransactionsAssert;
  @FindBy(xpath = "//section//td[1]")                                                                                   private WebElement FirstMessagesId;
  @FindBy(xpath = "//section//td[1]")                                                                                   private WebElement FirstTransactionsId;

  private WebDriver driver;
  private WebDriverWait wait;

  public BlockPage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 30);
    PageFactory.initElements(driver, this);
  }

  public void detailedDataBlock() {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.println("Assert - Id");
    wait.until(ExpectedConditions.visibilityOf(MessagesAssert));
    Assert.assertEquals("Messages", MessagesAssert.getText());
    System.out.println("Assert - Messages");
    wait.until(ExpectedConditions.visibilityOf(NodesAssert));
    Assert.assertEquals("Nodes", NodesAssert.getText());
    System.out.println("Assert - Nodes");
    wait.until(ExpectedConditions.visibilityOf(TransactionsAssert));
    Assert.assertEquals("Transactions", TransactionsAssert.getText());
    System.out.println("Assert - Transactions");
    wait.until(ExpectedConditions.visibilityOf(DividendBalanceAssert));
    Assert.assertEquals("Dividend Balance", DividendBalanceAssert.getText());
    System.out.println("Assert - Dividend Balance");
    wait.until(ExpectedConditions.visibilityOf(DividendPayAssert));
    Assert.assertEquals("Dividend Pay", DividendPayAssert.getText());
    System.out.println("Assert - Dividend Pay");
    wait.until(ExpectedConditions.visibilityOf(OldHashAssert));
    Assert.assertEquals("Old Hash", OldHashAssert.getText());
    System.out.println("Assert - Old Hash");
    wait.until(ExpectedConditions.visibilityOf(NowHashAssert));
    Assert.assertEquals("Now Hash", NowHashAssert.getText());
    System.out.println("Assert - Now Hash");
    wait.until(ExpectedConditions.visibilityOf(MsgHashAssert));
    Assert.assertEquals("Msg Hash", MsgHashAssert.getText());
    System.out.println("Assert - Msg Hash");
    wait.until(ExpectedConditions.visibilityOf(VipHashAssert));
    Assert.assertEquals("Vip Hash", VipHashAssert.getText());
    System.out.println("Assert - Vip Hash");
    wait.until(ExpectedConditions.visibilityOf(VipHashAssert));
    Assert.assertEquals("Time", TimeAssert.getText());
    System.out.println("Assert - Time");

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

  public void sortingSccountsInBlock() {
    if(!driver.findElements(By.xpath("//section//thead//th[1]//span")).isEmpty()) {
      wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
      Assert.assertEquals("Id", MessageIdAssert.getText());
      System.out.println("Assert - Message Id");
      wait.until(ExpectedConditions.visibilityOf(MessageNodeIdAssert));
      Assert.assertEquals("Node Id", MessageNodeIdAssert.getText());
      System.out.println("Assert - Message Node Id");
      wait.until(ExpectedConditions.visibilityOf(MessageTransactionsAssert));
      Assert.assertEquals("Transactions", MessageTransactionsAssert.getText());
      System.out.println("Assert - Message Transactions");
    }else{
      System.out.println("Skip >>>>> No message in Block");
    }
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    if(!driver.findElements(By.xpath("//section//thead//th[1]//span")).isEmpty()) {
      wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
      MessageIdAssert.click();
      System.out.println("Click - Messages Id");
      String url=driver.getCurrentUrl();
      System.out.println(url);
      if(!driver.findElements(By.xpath("//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")).isEmpty()){
        System.out.println("---------- Next&Previous_test ----------");
        wait.until(ExpectedConditions.visibilityOf(Next));
        Next.click();
        System.out.println("Click - Next");
        wait.until(ExpectedConditions.visibilityOf(Previous));
        Previous.click();
        System.out.println("Click - Previous");
      }else{
        System.out.println("---------- no_Next&Previous_test ----------");
        System.out.println("Skip >>>>>");
      }
      if(!driver.findElements(By.xpath("//*[@class='table table-striped']//descendant::th[1]")).isEmpty()){
        System.out.println("---------- MessageIdAssert_test ----------");
        wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
        MessageIdAssert.click();
        System.out.println("Click - Messages Id");
        url=driver.getCurrentUrl();
        System.out.println(url);
      }else{
        System.out.println("---------- no_MessageIdAssert_test ----------");
        System.out.println("Skip >>>>>");
      }
    }else{System.out.println("Skip >>>>>");
    }
  }

  public void searchForABlock() {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.print("Assert - Id, ");
    wait.until(ExpectedConditions.visibilityOf(MessagesAssert));
    Assert.assertEquals("Messages", MessagesAssert.getText());
    System.out.print("Messages, ");
    wait.until(ExpectedConditions.visibilityOf(NodesAssert));
    Assert.assertEquals("Nodes", NodesAssert.getText());
    System.out.print("Nodes, ");
    wait.until(ExpectedConditions.visibilityOf(TransactionsAssert));
    Assert.assertEquals("Transactions", TransactionsAssert.getText());
    System.out.print("Transactions, ");
    wait.until(ExpectedConditions.visibilityOf(DividendBalanceAssert));
    Assert.assertEquals("Dividend Balance", DividendBalanceAssert.getText());
    System.out.print("Dividend Balance, ");
    wait.until(ExpectedConditions.visibilityOf(DividendPayAssert));
    Assert.assertEquals("Dividend Pay", DividendPayAssert.getText());
    System.out.print("Dividend Pay, ");
    wait.until(ExpectedConditions.visibilityOf(OldHashAssert));
    Assert.assertEquals("Old Hash", OldHashAssert.getText());
    System.out.print("Old Hash, ");
    wait.until(ExpectedConditions.visibilityOf(NowHashAssert));
    Assert.assertEquals("Now Hash", NowHashAssert.getText());
    System.out.print("Now Hash, ");
    wait.until(ExpectedConditions.visibilityOf(MsgHashAssert));
    Assert.assertEquals("Msg Hash", MsgHashAssert.getText());
    System.out.print("Msg Hash, ");
    wait.until(ExpectedConditions.visibilityOf(VipHashAssert));
    Assert.assertEquals("Vip Hash", VipHashAssert.getText());
    System.out.print("Vip Hash, ");
    wait.until(ExpectedConditions.visibilityOf(VipHashAssert));
    Assert.assertEquals("Time", TimeAssert.getText());
    System.out.print("Time");

    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");

    if(!driver.findElements(By.xpath("//*[@class='table table-striped']//descendant::td[1]")).isEmpty()){
      System.out.println("---------- FirstMessagesId_test ----------");
      wait.until(ExpectedConditions.visibilityOf(FirstMessagesId));
      FirstMessagesId.click();
      System.out.println("Click - FirstMessagesId");
      String url=driver.getCurrentUrl();
      System.out.println(url);
      if(!driver.findElements(By.xpath("//*[@class='table table-striped']//descendant::td[1]")).isEmpty()){
        System.out.println("---------- FirstTransactionsId_test ----------");
        wait.until(ExpectedConditions.visibilityOf(FirstTransactionsId));
        FirstTransactionsId.click();
        System.out.println("Click - FirstTransactionsId");
        url=driver.getCurrentUrl();
        System.out.println(url);
      }else {
        System.out.println("---------- no_FirstTransactionsId_test ----------");
        System.out.println("Skip >>>>>");
      }
    }else{
      System.out.println("---------- no_FirstMessagesId_test ----------");
      System.out.println("Skip >>>>>");
      System.out.println("---------- no_FirstTransactionsId_test ----------");
      System.out.println("Skip >>>>>");
    }
  }

  public void blockSearchnNoPosition() {
    wait.until(ExpectedConditions.visibilityOf(FailedToFetchAssert));
    Assert.assertEquals("Failed to fetch", FailedToFetchAssert.getText());
    System.out.println("Assert - FailedToFetchAssert");
  }

  public void sortingBlocks() {
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    System.out.println("Assert - SortIdOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    MessageIdAssert.click();
    System.out.println("Click - NodesId");
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderDescAssert));
    System.out.println("Assert - SortIdOrderDesc");
    String url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(Next));
    Next.click();
    System.out.println("Click - Next");
    wait.until(ExpectedConditions.visibilityOf(Previous));
    Previous.click();
    System.out.println("Click - Previous");
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    System.out.println("Assert - SortIdOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    MessageIdAssert.click();
    System.out.println("Click - NodesId");
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderDescAssert));
    System.out.println("Assert - SortIdOrderDesc");
    url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    wait.until(ExpectedConditions.visibilityOf(Previous));
    wait.until(ExpectedConditions.visibilityOf(Next));
    Next.click();
    System.out.println("Next -     Click");
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    wait.until(ExpectedConditions.visibilityOf(Previous));
    wait.until(ExpectedConditions.visibilityOf(Next));
    Previous.click();
    System.out.println("Previous - Click");
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    MessageIdAssert.click();
  }
}
